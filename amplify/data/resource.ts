import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { langChainFunction } from "../functions/langchain/resource";

const schema = a.schema({
  Conversation: a
    .model({
      messages: a.hasMany("Message"),
      name: a.string(),
    })
    .authorization([a.allow.public()]),
  Message: a
    .model({
      text: a.string(),
      type: a.enum(["ai", "human"]),
    })
    .authorization([a.allow.public()]),
  SendMessage: a
    .query()
    .arguments({ message: a.string(), conversationId: a.string() })
    .returns(a.string())
    .authorization([a.allow.public()])
    .function("langChain"),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  functions: {
    langChain: langChainFunction,
  },
});
