import { Text, View, ViewProps } from "@aws-amplify/ui-react";
import {
  LuLightbulb,
  LuUserCircle2,
  LuWand2,
  LuBrainCircuit,
} from "react-icons/lu";
import { classNames, classNameModifier } from "@aws-amplify/ui";
import Markdown from "react-markdown";
import { Schema } from "@/amplify/data/resource";

interface ChatMessageProps extends ViewProps {
  message: Schema["Message"];
}

const options = {
  hour: "2-digit",
  minute: "2-digit",
};

const iconMap = {
  dialog: <LuLightbulb />,
  action: <LuWand2 />,
  agent: <LuBrainCircuit />,
  user: <LuUserCircle2 />,
};

const baseClassName = `amplify-chat-message`;

export function ChatMessage({ message, ...rest }: ChatMessageProps) {
  // @ts-ignore
  const time = new Date(message.createdAt ?? "").toLocaleString(
    "en-US",
    options
  );
  const text = message.text;
  const icon = message.type === "human" ? "user" : "agent";

  return (
    <View className={classNames(baseClassName)}>
      <View className="amplify-chat-message__icon">{iconMap[icon]}</View>

      {message ? (
        <View className="amplify-chat-message__meta">
          <Text className="amplify-chat-message__sender">{icon}</Text>
          <Text className="amplify-chat-message__timestamp">{time}</Text>
        </View>
      ) : null}

      <View className="amplify-chat-message__text">
        <Markdown>{text}</Markdown>
      </View>
    </View>
  );
}
