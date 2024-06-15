import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

export const textSummarizer = defineFunction({
  entry: "./handlers/textSummarizer.ts",
  timeoutSeconds: 500,
});

export const chatHandler = defineFunction({
  entry: "./handlers/chatHandler.ts",
  timeoutSeconds: 500,
  environment: {
    aiModel: "anthropic.claude-3-haiku-20240307-v1:0",
    instructions: `
    You are a helpful assistant on a home rental listing site.
    `,
  },
});

const schema = a.schema({
  getWeather: a
    .query()
    .arguments({
      location: a.string(),
    })
    .returns(a.string())
    .handler(
      a.handler.custom({
        dataSource: "WeatherAPIDataSource",
        entry: "./resolvers/weatherResolver.js",
      })
    )
    .authorization((allow) => [allow.authenticated()]),

  knowledgeBase: a
    .query()
    .arguments({ input: a.string() })
    .handler(
      a.handler.custom({
        dataSource: "KnowledgeBaseDataSource",
        entry: "./resolvers/knowledgeBaseResolver.js",
      })
    )
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()]),

  textSummarizer: a
    .query()
    .arguments({
      text: a.string(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(textSummarizer)),

  chat: a
    .query()
    .arguments({
      sessionId: a.string(),
      message: a.string(), // should it send a full message type?
      context: a.json(),
      uiComponents: a.json(),
    })
    .handler(a.handler.function(chatHandler))
    .returns(a.string())
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

  ChatSession: a
    .model({
      messages: a.hasMany("ChatMessage", "sessionId"),
      name: a.string(),
      metadata: a.json(),
    })
    .authorization((allow) => [allow.owner()]),

  ToolUse: a.customType({
    input: a.string(),
    name: a.string(),
    toolUseId: a.string(),
  }),

  ToolResultContent: a.customType({
    text: a.string(),
  }),

  ToolResult: a.customType({
    toolUseId: a.string(),
    content: a.ref("ToolResultContent").array(),
  }),

  ContentBlock: a.customType({
    text: a.string(),
    image: a.string(),
    toolUse: a.ref("ToolUse"),
    toolResult: a.ref("ToolResult"),
  }),

  ChatMessage: a
    .model({
      role: a.string(),
      content: a.ref("ContentBlock").array(),
      session: a.belongsTo("ChatSession", "sessionId"),
      sessionId: a.id(),
    })
    .secondaryIndexes((index) => [index("sessionId")])
    .authorization((allow) => [allow.owner()]),
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
});
