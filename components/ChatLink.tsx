import { Flex, Menu, MenuItem, Text, View } from "@aws-amplify/ui-react";
import Link from "next/link";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { client } from "@/client";

export interface Conversation {
  id: string;
  name?: string;
}

const options = {
  // weekday: "long",
  // year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const ConversationLink = (props: Conversation) => {
  const { id, name } = props;
  // @ts-ignore
  // const time = timestamp ? new Date(timestamp).toLocaleString('en-US', options) : ' ';

  const handleDelete = () => {
    client.models.Conversation.delete({
      id,
    });
  };

  return (
    <Flex direction="row" alignItems="center" wrap="nowrap" width="100%">
      <Flex direction="column" overflow="hidden" gap="0" flex="1">
        <View
          style={{ textOverflow: "ellipsis" }}
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Link className="amplify-link" href={`/chat/${id}`}>
            {name ?? id}
          </Link>
        </View>
        {/* <Text color="font.tertiary">{time}</Text> */}
      </Flex>
      <Menu menuAlign="start">
        <MenuItem
          onClick={() => {
            /* TODO */
          }}
          gap="xs"
        >
          <LuPencil />
          Rename
        </MenuItem>
        <MenuItem
          className="amplify-button--link--error"
          onClick={handleDelete}
          gap="xs"
        >
          <LuTrash2 />
          Delete
        </MenuItem>
      </Menu>
    </Flex>
  );
};
