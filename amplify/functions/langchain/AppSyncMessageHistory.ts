import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import {
  AIMessage,
  BaseListChatMessageHistory,
  BaseMessage,
  HumanMessage,
} from "langchain/schema";
import { AppSyncResolverEvent } from "aws-lambda";
import { Schema } from "../../data/resource";

interface AppSyncMessageHistoryProps {
  endpoint: string;
  apiKey: string;
  event: AppSyncResolverEvent<{ message: string; conversationId: string }>;
}


export class AppSyncMessageHistory extends BaseListChatMessageHistory {
  lc_namespace = ["foo"];
  readonly client;
  readonly conversationId;
  readonly message;

  constructor(props: AppSyncMessageHistoryProps) {
    super(props);
    const { endpoint, apiKey } = props;
    const { conversationId, message } = props.event.arguments;
    this.conversationId = conversationId;
    this.message = message;

    Amplify.configure({
      API: {
        GraphQL: {
          endpoint,
          apiKey,
          defaultAuthMode: "apiKey",
          modelIntrospection: {
            "version": 1,
            "models": {
              "Conversation": {
                "name": "Conversation",
                "fields": {
                  "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                  },
                  "messages": {
                    "name": "messages",
                    "isArray": true,
                    "type": {
                      "model": "Message"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                      // @ts-ignore
                      "connectionType": "HAS_MANY",
                      "associatedWith": [
                        "conversationMessagesId"
                      ]
                    }
                  },
                  "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                  },
                  "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                  },
                  "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                  }
                },
                "syncable": true,
                "pluralName": "Conversations",
                "attributes": [
                  {
                    "type": "model",
                    "properties": {}
                  },
                  {
                    "type": "key",
                    "properties": {
                      "fields": [
                        "id"
                      ]
                    }
                  },
                  {
                    "type": "auth",
                    "properties": {
                      "rules": [
                        {
                          "allow": "public",
                          "operations": [
                            "create",
                            "update",
                            "delete",
                            "read"
                          ]
                        }
                      ]
                    }
                  }
                ],
                "primaryKeyInfo": {
                  "isCustomPrimaryKey": false,
                  "primaryKeyFieldName": "id",
                  "sortKeyFieldNames": []
                }
              },
              "Message": {
                "name": "Message",
                "fields": {
                  "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                  },
                  "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                  },
                  "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                      "enum": "MessageType"
                    },
                    "isRequired": false,
                    "attributes": []
                  },
                  "conversationMessagesId": {
                    "name": "conversationMessagesId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                  },
                  "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                  },
                  "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                  }
                },
                "syncable": true,
                "pluralName": "Messages",
                "attributes": [
                  {
                    "type": "model",
                    "properties": {}
                  },
                  {
                    "type": "key",
                    "properties": {
                      "fields": [
                        "id"
                      ]
                    }
                  },
                  {
                    "type": "key",
                    "properties": {
                      "name": "gsi-Conversation.messages",
                      "fields": [
                        "conversationMessagesId"
                      ]
                    }
                  },
                  {
                    "type": "auth",
                    "properties": {
                      "rules": [
                        {
                          "allow": "public",
                          "operations": [
                            "create",
                            "update",
                            "delete",
                            "read"
                          ]
                        }
                      ]
                    }
                  }
                ],
                "primaryKeyInfo": {
                  "isCustomPrimaryKey": false,
                  "primaryKeyFieldName": "id",
                  "sortKeyFieldNames": []
                }
              }
            },
            "enums": {
              "MessageType": {
                "name": "MessageType",
                "values": [
                  "ai",
                  "human"
                ]
              }
            },
            "nonModels": {},
            "queries": {
              "SendMessage": {
                "name": "SendMessage",
                "isArray": false,
                "type": "String",
                "isRequired": false,
                "arguments": {
                  "message": {
                    "name": "message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false
                  },
                  "conversationId": {
                    "name": "conversationId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false
                  }
                }
              }
            }
          }
        },
      },
    });

    this.client = generateClient<Schema>();
  }

  async addMessage(message: BaseMessage) {
    console.log("Add message");
    const foo = message.toDict();

    await this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message.content as string,
      // figure out better casting here
      type: foo.type as ReturnType<typeof this.client.enums.MessageType.values>[number],
    })
  }

  async addAIMessage(message: string) {
    console.log("Add AI message");
    await this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message,
      type: 'ai',
    })
  }

  async addUserMessage(message: string) {
    console.log("Add user message");
    await this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message,
      type: 'human',
    })
  }

  async getMessages() {
    console.log("Get messages");
    const { data: items, errors } = await this.client
      .models.Message.list({
        filter: {
          conversationMessagesId: {
            eq: this.conversationId,
          },
        }
      })

    const messages = items.map((message) => {
      switch (message.type) {
        case "ai":
          return new AIMessage(message.text ?? "");
        case "human":
          return new HumanMessage(message.text ?? "");
        default:
          throw new Error(`Got unexpected type: ${message.type}`);
      }
    });

    return messages;
  }

  async clear(): Promise<void> { }
}
