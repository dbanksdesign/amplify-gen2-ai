import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAIResponse } from "./getAIResponse";
import { createMessenger } from "./message";
import { weatherTool } from "./tool";

type ConversationHandler = (event: any) => void;

export function createConversationHandler(): ConversationHandler {
  return async function (event) {
    const endpoint = `https://${event.request.headers.host}/graphql`;
    const authToken = event.request.headers.authorization;
    const { sessionId, message, context, uiComponents } = event.arguments;

    Amplify.configure({
      API: {
        GraphQL: {
          endpoint,
          defaultAuthMode: "lambda",
        },
      },
    });

    const client = generateClient({
      authMode: "lambda",
      authToken,
      headers: {
        Authorization: authToken,
      },
    });

    const { getMessages, saveMessage } = createMessenger({
      sessionId,
      client,
    });

    const messages = await getMessages();

    const { aiModel, instructions = "you are a helpful assistant" } =
      // @ts-ignore
      process.env;

    await getAIResponse({
      aiModel,
      instructions,
      uiComponents,
      context,
      messages: [...messages, message],
      // TODO: somehow go from backend definition to tools
      tools: [
        // @ts-ignore
        weatherTool({ client }),
      ],
      onMessage: async (args) => {
        await saveMessage({
          message: args.output?.message!,
        });
      },
      onToolUse: async (args) => {
        console.log("on Tool use");
        console.log(JSON.stringify(args, null, 2));
      },
      onUIUse: (args) => {
        console.log("on UI use");
        console.log(JSON.stringify(args, null, 2));
      },
    });
  };
}
