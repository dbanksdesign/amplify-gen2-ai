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
import { useParams, useRouter } from "next/navigation";
import { Conversation, ConversationLink } from "@/components/ChatLink";
import { Schema } from "@/amplify/data/resource";
import { client } from "@/client";
import { useConversation } from "@/hooks/useConversation";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { conversations } = useConversation();

  const handleClick = async () => {
    const convo = await client.models.Conversation.create({});
    router.push(`/chat/${convo.data.id}`);
  };

  return (
    <Flex direction="row" width="100%" height="100%" gap="0">
      <Flex direction="column" width="30%" className="app-sidebar">
        <ScrollView
          backgroundColor="background.primary"
          color="font.primary"
          flex="1"
        >
          <Flex direction="column" padding="large">
            {conversations.map((convo) => {
              return <ConversationLink conversation={convo} key={convo.id} />;
            })}
          </Flex>
        </ScrollView>
        <View padding="large">
          <Button variation="primary" onClick={handleClick}>
            New chat
          </Button>
        </View>
      </Flex>
      <View flex="1">{children}</View>
    </Flex>
  );
}
