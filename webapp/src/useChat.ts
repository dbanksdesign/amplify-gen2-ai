import * as React from "react";
import { type Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

type UIComponentProp =
  | {
      type: "boolean" | "number";
      description?: string;
    }
  | {
      type: "object";
      properties: UIComponentProp;
      description?: string;
    }
  | {
      type: "string";
      enum?: string[];
      description?: string;
    };

interface UIComponent {
  name: string;
  description?: string;
  props: Record<string, UIComponentProp>;
}

const client = generateClient<Schema>({
  authMode: "userPool",
});

interface UseChatProps {
  sessionId?: string;
  onSessionCreate?: (sessionId?: string) => void;
}

export const useChat = ({ sessionId, onSessionCreate }: UseChatProps) => {
  // if no session id, create one on initial message
  const [sid, setSid] = React.useState<string>();
  const [messages, setMessages] = React.useState<
    Schema["ChatMessage"]["type"][]
  >([]);

  React.useEffect(() => {
    if (sessionId) {
      console.log({ sessionId });
      setSid(sessionId);
      client.models.ChatMessage.observeQuery({
        filter: {
          sessionId: {
            eq: sessionId,
          },
        },
      }).subscribe({
        next: ({ items, isSynced }) => {
          if (isSynced) {
            setMessages([
              ...items.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)),
            ]);
          }
        },
      });
    }
  }, [sessionId]);

  // add ui components here
  // ui components and context are sent with each message
  const sendMessage = async ({
    message,
    context,
    uiComponents = [],
  }: {
    message: string;
    context?: Record<string, any>;
    uiComponents?: UIComponent[];
  }) => {
    let _sid = sid;
    if (!sid) {
      const results = await client.models.ChatSession.create({});
      onSessionCreate?.(results.data?.id);
      if (results.data?.id) {
        setSid(results.data.id);
      }
      _sid = results.data?.id;
    } else {
      // save message to db, but don't need to await on it
      await client.models.ChatMessage.create({
        sessionId: _sid,
        content: [{ text: message }],
        role: "user",
      });

      // weird that we are passing the message to the data model and then doing ANOTHER
      // query afterwards...
      await client.queries.chat({
        sessionId: _sid,
        message,
        context: JSON.stringify(context),
        uiComponents: JSON.stringify(uiComponents),
      });
    }
  };

  return {
    sendMessage,
    messages,
  };
};
