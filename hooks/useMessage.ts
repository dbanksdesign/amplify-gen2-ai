import { Schema } from "@/amplify/data/resource";
import { client } from "@/client";
import * as React from "react";

interface UseMessageProps {
  conversationId?: string;
}

export const useMessage = ({ conversationId }: UseMessageProps) => {
  const [messages, setMessages] = React.useState<Array<Schema["Message"]>>([]);

  React.useEffect(() => {
    if (typeof conversationId === "undefined") {
      return;
    }

    const sub = client.models.Message.observeQuery({
      filter: {
        conversationMessagesId: {
          // todo: cast this better
          eq: `${conversationId}`,
        },
      },
    }).subscribe({
      next: ({ items, isSynced, ...rest }) => {
        setMessages([
          ...items.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)),
        ]);
      },
    });

    return () => sub.unsubscribe();
  }, [conversationId]);

  return { messages, setMessages };
};
