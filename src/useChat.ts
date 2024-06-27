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
      setSid(sessionId);
      client.models.ChatMessage.observeQuery({
        filter: {
          sessionId: {
            eq: sessionId,
          },
        },
      }).subscribe({
        next: ({ items, isSynced }) => {
          console.log({ items, isSynced });
          if (isSynced && items.length > 0) {
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
    // optimistically add the message
    // @ts-ignore
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sessionId: sid,
        role: "user",
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: [
          {
            text: message,
          },
        ],
      },
    ]);

    let _sid = sid;
    if (!sid) {
      const results = await client.models.ChatSession.create({});
      onSessionCreate?.(results.data?.id);
      _sid = results.data?.id;
    }

    await client.queries.chat({
      sessionId: _sid,
      message,
      context: JSON.stringify(context),
      uiComponents: JSON.stringify(uiComponents),
    });
  };

  return {
    sendMessage,
    messages,
  };
};
