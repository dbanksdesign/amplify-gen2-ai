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
import { ConversationLink } from "@/components/ChatLink";
import { Schema } from "../../amplify/data/resource";
import { client } from "@/client";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  const [chats, setChats] = React.useState<Schema["ChatSession"]["type"][]>([]);
  React.useEffect(() => {
    client.models.ChatSession.observeQuery().subscribe({
      next: (results) => {
        setChats(results.items);
      },
    });
  }, []);

  return (
    <Flex direction="row" width="100%" height="100%" gap="0">
      <Flex direction="column" width="30%" className="app-sidebar">
        <ScrollView
          backgroundColor="background.primary"
          color="font.primary"
          flex="1"
        >
          <Flex direction="column" padding="large">
            {chats.map((chat) => {
              return <ConversationLink conversation={chat} key={chat.id} />;
            })}
          </Flex>
        </ScrollView>
      </Flex>
      <View flex="1">{children}</View>
    </Flex>
  );
}
