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
import * as queries from "@/graphql/queries";
import { useMessage } from "@/hooks/useMessage";

const ChatMessages = ({ messages }: { messages: Array<Schema["Message"]> }) => {
  console.log({ messages });
  return (
    <>
      {messages.map((message, i) => (
        <ChatMessage message={message} key={`${i}-${message.type}`} />
      ))}
    </>
  );
};

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.id as string;
  const { messages, setMessages } = useMessage({ conversationId });

  const handleSubmit = async (value: string) => {
    // Add the user's message eagerly
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
