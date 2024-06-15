import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  Tool,
  InferenceConfiguration,
} from "@aws-sdk/client-bedrock-runtime";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

interface SaveMessageParams {
  endpoint: string;
  routeName: string;
  sessionId: string;
  authToken: string;
  message: Message;
}

export async function saveMessage({
  endpoint,
  routeName,
  sessionId,
  authToken,
  message,
}: SaveMessageParams) {
  // turn route name into mutation

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

  console.log("MESSAGE");
  console.log(JSON.stringify(message, null, 2));

  try {
    const result = await client.graphql({
      query: `
      mutation MyMutation {
        createChatMessage(input: {sessionId: "${sessionId}", role: "${message.role}", content: {text: "${message?.content?.[0]?.text}"}}) {
          owner
          content {
            text
          }
          createdAt
          id
          role
          sessionId
          updatedAt
        }
      }
      `,
      variables: {},
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
