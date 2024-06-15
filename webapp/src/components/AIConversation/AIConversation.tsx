import { Flex } from "@aws-amplify/ui-react";
import { AIConversationContext, AIConversationContextProps } from "./Provider";
import { Prompt } from "./Prompt";
import { UIComponent } from "./types";
import { Schema } from "../../../amplify/data/resource";
import { Message } from "./Message";
import { ChatScroll } from "./ChatScroll";

interface AIConversationProps extends Partial<AIConversationContextProps> {
  sendMessage: ({
    message,
    context,
    uiComponents,
  }: {
    message: string;
    context?: Record<string, any>;
    uiComponents?: UIComponent[];
  }) => Promise<void>;
  messages: Schema["ChatMessage"]["type"][];
  user?: {
    avatar?: React.ReactNode;
    username?: string | null;
  };
  ai?: {
    avatar?: React.ReactNode;
    username?: string;
  };
  placeholder?: string;
}

export const AIConversation = ({
  // handleSubmit,
  // text,
  uiComponents = {},
  context = {},
  sendMessage,
  messages,
  user = { username: "user" },
  ai = { username: "assistant" },
  placeholder = "What can I help you with?",
}: React.PropsWithChildren<AIConversationProps>) => {
  const username = (role?: string | null) => {
    if (role === "assistant") {
      return ai.username;
    }
    return user?.username ?? undefined;
  };

  const avatar = (role?: string | null) => {
    if (role === "assistant") {
      return ai.avatar;
    }
    return user?.avatar;
  };

  return (
    <AIConversationContext.Provider value={{ uiComponents, context }}>
      <Flex direction="column" height="100%">
        <ChatScroll>
          {messages.map((message) => (
            <Message
              username={username(message.role)}
              avatar={avatar(message.role)}
              message={message}
              key={message.id}
            />
          ))}
        </ChatScroll>
        <Prompt
          placeholder={placeholder}
          handleSubmit={(value) => {
            const _uiComponents = Object.entries(uiComponents).map(
              ([key, value]) => {
                return {
                  name: key,
                  description: value.description,
                  props: value.props,
                };
              }
            );
            sendMessage({
              message: value,
              uiComponents: _uiComponents,
              context,
            });
          }}
        />
      </Flex>
    </AIConversationContext.Provider>
  );
};
