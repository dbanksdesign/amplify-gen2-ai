import { Message } from "@aws-sdk/client-bedrock-runtime";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

interface CreateMessengerParams {
  // endpoint: string;
  // authToken: string;
  sessionId: string;
  client: ReturnType<typeof generateClient>;
}

// TODO: make this compatible with LangChain history
// Would it make sense to have an ai class/object
// it would handle both tool uses as queries and
// message history?
export function createMessenger({
  // endpoint,
  // authToken,
  sessionId,
  client,
}: CreateMessengerParams) {
  // Amplify.configure({
  //   API: {
  //     GraphQL: {
  //       endpoint,
  //       defaultAuthMode: "lambda",
  //     },
  //   },
  // });

  // const client = generateClient({
  //   authMode: "lambda",
  //   authToken,
  //   headers: {
  //     Authorization: authToken,
  //   },
  // });

  return {
    saveMessage: async ({ message }: { message: Message }) => {
      console.log("saveMessage");

      const content = message.content
        ?.map((contentBlock) => {
          if (contentBlock.toolUse) {
            // if (contentBlock.toolUse.name?.startsWith("UI")) {
            //   return null;
            // }
            return {
              toolUse: {
                ...contentBlock.toolUse,
                input: JSON.stringify(contentBlock.toolUse.input),
              },
            };
            // } else if (contentBlock.toolResult) {
            //   return null;
          } else {
            return contentBlock;
          }
        })
        .filter((contentBlock) => !!contentBlock);

      try {
        const result = await client.graphql({
          query: `
          mutation MyMutation($content: [ContentBlockInput]) {
            createChatMessage(input: {sessionId: "${sessionId}", role: "${message.role}", content: $content}) {
              owner
              content {
                text
                toolUse {
                  input
                  name
                  toolUseId
                }
                toolResult {
                  toolUseId
                  content {
                    text
                  }
                }
              }
              createdAt
              id
              role
              sessionId
              updatedAt
            }
          }
          `,
          variables: {
            content,
          },
        });
        console.log(JSON.stringify({ result }, null, 2));
      } catch (error) {
        console.log(error);
      }
    },
    getMessages: async () => {
      try {
        const result = await client.graphql({
          query: `
          query GetMessages {
            listChatMessageBySessionId(sessionId: "${sessionId}") {
              items {
                owner
                content {
                  text
                  toolUse {
                    input
                    name
                    toolUseId
                  }
                  toolResult {
                    toolUseId
                    content {
                      text
                    }
                  }
                }
                createdAt
                id
                role
                sessionId
                updatedAt
              }
            }
          }
          `,
        });
        console.log(JSON.stringify(result, null, 2));
        // need to type this return based on the shape of the message data model
        // we need to be able to go from data model to message type?
        // @ts-ignore
        const messages = result.data.listChatMessageBySessionId.items.sort(
          (a: any, b: any) => (a.updatedAt > b.updatedAt ? 1 : -1)
        );

        const _messages = messages.map((message: any) => {
          return {
            role: message.role,
            content: message.content
              .map((contentBlock: any) => {
                if (contentBlock.text) {
                  return {
                    text: contentBlock.text,
                  };
                }
                if (contentBlock.toolUse) {
                  // we don't want to tell the LLM
                  // about UI tool use or itll get confused
                  if (contentBlock.toolUse.name?.startsWith("UI")) {
                    return null;
                  }
                  return {
                    toolUse: {
                      ...contentBlock.toolUse,
                      input: JSON.parse(contentBlock.toolUse.input),
                    },
                  };
                }
                if (contentBlock.toolResult) {
                  return {
                    toolResult: contentBlock.toolResult,
                  };
                }
              })
              .filter((contentBlock: any) => !!contentBlock),
          };
        });
        console.log({ _messages });
        return _messages;
      } catch (error) {
        console.log(error);
      }
    },
  };
}
