import * as React from "react";
import {
  Flex,
  Menu,
  MenuItem,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import Link from "next/link";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { client } from "@/client";
import { Schema } from "@/../amplify/data/resource";

export interface ChatLinkProps {
  conversation: Schema["ChatSession"]["type"];
}

const options: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const ConversationLink = (props: ChatLinkProps) => {
  const {
    conversation: { id, createdAt, name },
  } = props;
  const time = new Date(createdAt).toLocaleString("en-US", options);
  const [editShown, setEditShown] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    client.models.ChatSession.delete({
      id,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      client.models.ChatSession.update({
        id,
        name: inputRef.current?.value,
      }).then(() => {
        inputRef.current?.blur();
      });
    }
  };

  return (
    <Flex direction="row" alignItems="center" wrap="nowrap" width="100%">
      <Flex direction="column" overflow="hidden" gap="0" flex="1">
        <View
          style={{ textOverflow: "ellipsis" }}
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <View
            as="form"
            onSubmit={handleSubmit}
            display={editShown ? "block" : "none"}
          >
            <TextField
              variation="quiet"
              label="conversation name"
              labelHidden
              ref={inputRef}
              defaultValue={name ?? ""}
              onBlur={() => {
                setEditShown(false);
              }}
            />
          </View>
          <Link
            style={{ display: editShown ? "none" : "block" }}
            className="amplify-link"
            href={`/chat/${id}`}
          >
            {name ?? id}
          </Link>
          <Text>{time}</Text>
        </View>
        {/* <Text color="font.tertiary">{time}</Text> */}
      </Flex>
      <Menu menuAlign="start">
        <MenuItem
          onClick={() => {
            /* TODO */
            setEditShown(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
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
