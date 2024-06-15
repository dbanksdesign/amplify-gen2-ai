import * as React from "react";
import { Image, Loader, Text, View, ViewProps } from "@aws-amplify/ui-react";
import {
  LuLightbulb,
  LuUserCircle2,
  LuWand2,
  LuBrainCircuit,
} from "react-icons/lu";
// import Markdown from "react-markdown";
// import { createComponentTheme } from "@aws-amplify/ui";
import { Schema } from "../../../amplify/data/resource";
import { useUIComponents } from "./useUIComponents";

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const iconMap = {
  dialog: <LuLightbulb />,
  action: <LuWand2 />,
  agent: <LuBrainCircuit />,
  user: <LuUserCircle2 />,
};

// const theme = createComponentTheme({
//   name: "chat-message",
//   theme(tokens) {
//     const bgColor = "message-bg-color";
//     return {
//       vars: {
//         [bgColor]: tokens.colors.secondary[60],
//       },
//       display: "flex",
//       flexDirection: "column",
//       gap: tokens.space.xxxs,
//       position: "relative",
//       paddingInlineStart: "2.5rem",
//       minHeight: "2rem",
//       justifyContent: "center",
//       marginBlockStart: tokens.space.medium,
//       _modifier: {
//         assistant: {
//           vars: {
//             [bgColor]: tokens.colors.primary[60],
//           },
//         },
//       },
//       _element: {
//         meta: {
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "baseline",
//           gap: tokens.space.small,
//         },
//         sender: {
//           fontWeight: tokens.fontWeights.bold,
//         },
//         timestamp: {
//           color: tokens.colors.font.tertiary,
//           fontSize: tokens.fontSizes.small,
//         },
//         icon: {
//           position: "absolute",
//           top: 0,
//           left: 0,

//           width: "2rem",
//           height: "2rem",
//           display: "flex",
//           textAlign: "center",
//           alignItems: "center",
//           justifyContent: "center",
//           borderRadius: "10rem",
//           backgroundColor: `var(--${bgColor})`,
//           color: "white",
//           overflow: "hidden",
//           _modifier: {
//             bubble: {
//               color: tokens.colors.font.tertiary,
//               backgroundColor: tokens.colors.background.secondary,
//             },
//             thinking: {
//               overflow: "visible",
//             },
//           },
//         },
//         loader: {
//           position: "absolute",
//           width: `calc(100% + ${tokens.space.medium})`,
//           height: `calc(100% + ${tokens.space.medium})`,
//           top: `calc(-0.5 * ${tokens.space.medium})`,
//           left: `calc(-0.5 * ${tokens.space.medium})`,
//         },
//         text: {
//           _modifier: {
//             bubble: {
//               paddingInline: tokens.space.medium,
//               paddingBlock: tokens.space.xs,
//               borderRadius: tokens.radii.medium,
//               backgroundColor: `var(--${bgColor})`,
//               color: tokens.colors.font.inverse,
//             },
//           },
//         },
//       },
//     };
//   },
// });

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
