import { Schema } from "@/amplify/data/resource";
import { client } from "@/client";
import * as React from "react";

export const useConversation = () => {
  const [conversations, setConversations] = React.useState<
    Array<Schema["Conversation"]>
  >([]);

  React.useEffect(() => {
    const sub = client.models.Conversation.observeQuery({}).subscribe({
      next: ({ items, isSynced, ...rest }) => {
        setConversations([
          ...items.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1)),
        ]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  return { conversations, setConversations };
};
