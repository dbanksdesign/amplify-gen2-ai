import * as React from "react";
import {
  Button,
  Flex,
  Loader,
  ScrollView,
  SelectField,
  Text,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { useParams } from "next/navigation";
import { client } from "@/client";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatPrompt } from "@/components/ChatPrompt";
import { ChatScroll } from "@/components/ChatScroll";
import { Schema } from "@/amplify/data/resource";
import * as queries from "@/queries";

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.id;
  const [messages, setMessages] = React.useState<Array<Schema["Message"]>>([]);

  React.useEffect(() => {
    const sub = client.models.Message.observeQuery({
      filter: {
        conversationMessagesId: {
          // todo: cast this better
          eq: `${conversationId}`,
        },
      },
    }).subscribe({
      next: ({ items, isSynced, ...rest }) => {
        setMessages(items.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)));
      },
    });
    return () => sub.unsubscribe();
  }, [conversationId]);

  const handleSubmit = async (value: string) => {
    // Add the user's message immediately
    // the observeQuery will later add the actual message data saved
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: value,
        type: "human",
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    client.graphql({
      query: queries.SendMessage,
      variables: {
        message: value,
        conversationId: `${conversationId}`,
      },
    });
  };

  return (
    <Flex direction="column" gap="0" height="100%">
      <ChatScroll>
        <Flex direction="column">
          {messages.map((message, i) => (
            <ChatMessage message={message} key={`${i}-${message.type}`} />
          ))}
        </Flex>
      </ChatScroll>
      <View
        className="amplify-chat__footer"
        paddingInline="xl"
        paddingBlock="medium"
        backgroundColor="background.primary"
      >
        <ChatPrompt handleSubmit={handleSubmit} />
      </View>
    </Flex>
  );
}

// ChatPage.getLayout = function getLayout(page: React.ReactElement) {
//   return (
//     <ChatLayout>
//       {page}
//     </ChatLayout>
//   )
// }
