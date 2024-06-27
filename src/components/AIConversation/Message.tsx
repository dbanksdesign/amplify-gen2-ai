import * as React from "react";
import { Image, Loader, Text, View, ViewProps } from "@aws-amplify/ui-react";
import {
  LuLightbulb,
  LuUserCircle2,
  LuWand2,
  LuBrainCircuit,
} from "react-icons/lu";
// import Markdown from "react-markdown";
import { Schema } from "../../../amplify/data/resource";
import { useUIComponents } from "./useUIComponents";

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  // second: "2-digit",
};

const iconMap = {
  dialog: <LuLightbulb />,
  action: <LuWand2 />,
  agent: <LuBrainCircuit />,
  user: <LuUserCircle2 />,
};

interface MessageProps {
  variation?: "bubble" | "block";
  username?: string;
  avatar?: React.ReactNode;
  message: Schema["ChatMessage"]["type"];
}

export const Message = ({
  message,
  avatar,
  username,
}: React.PropsWithChildren<MessageProps>) => {
  // we don't want to show tool results as messages
  if (message.content?.find((content) => content?.toolResult)) {
    return null;
  }
  const icon = message.role && message.role === "user" ? "user" : "agent";
  const time = new Date(message.createdAt ?? "").toLocaleString(
    "en-US",
    options
  );

  return (
    <View className={"amplify-chat-message"}>
      <View
        className={`amplify-chat-message__avatar amplify-chat-message__avatar--${message.role}`}
      >
        {avatar ? avatar : iconMap[icon]}
      </View>

      <View className="amplify-chat-message__meta">
        <Text className="amplify-chat-message__sender">
          {username ?? message.role}
        </Text>
        {message.createdAt ? (
          <Text className="amplify-chat-message__timestamp">{time}</Text>
        ) : null}
      </View>

      <View className={"amplify-chat-message__content"}>
        <MessageContent content={message.content} />
      </View>
    </View>
  );
};

const MessageContent = ({
  content,
}: {
  content: Schema["ChatMessage"]["type"]["content"];
}) => {
  return (
    <>
      {content?.map((c, i) => {
        const isToolUse = c?.toolUse?.name?.startsWith("UI_");
        return (
          <div key={i}>
            {c?.text ? <Text>{c.text}</Text> : null}
            {isToolUse ? (
              <MessageUIComponent
                name={c?.toolUse?.name?.replace("UI_", "") ?? ""}
                input={c?.toolUse?.input?.toString() ?? "{}"}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
};

const MessageUIComponent = ({
  name,
  input,
}: {
  name: string;
  input: string;
}) => {
  const { uiComponents } = useUIComponents();
  try {
    const props = JSON.parse(input);
    const Component = uiComponents[name].component;

    if (!Component) {
      return null;
    }

    return <Component {...props} />;
  } catch (error) {
    console.log(error);
    return null;
  }
};
