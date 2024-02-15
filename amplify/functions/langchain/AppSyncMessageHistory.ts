import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  AIMessage,
  BaseListChatMessageHistory,
  BaseMessage,
  HumanMessage,
} from "langchain/schema";
import * as queries from "../../../graphql/queries";
import * as mutations from "../../../graphql/mutations";
import { AppSyncResolverEvent } from "aws-lambda";
import { Type } from "../../../graphql/API";

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
        },
      },
    });

    this.client = generateClient({});
  }

  addMessage(message: BaseMessage): Promise<void> {
    console.log("Add message");
    const foo = message.toDict();

    return this.client
      .graphql({
        query: mutations.createMessage,
        variables: {
          input: {
            conversationMessagesId: this.conversationId,
            text: message.content as string,
            // figure out better casting here
            type: foo.type as Type,
          },
        },
      })
      .then();
    // todo: figure this out, feels weird
  }

  addAIMessage(message: string): Promise<void> {
    console.log("Add AI message");
    return this.client
      .graphql({
        query: mutations.createMessage,
        variables: {
          input: {
            conversationMessagesId: this.conversationId,
            text: message,
            type: Type.ai,
          },
        },
      })
      .then();
  }

  addUserMessage(message: string): Promise<void> {
    console.log("Add user message");
    return this.client
      .graphql({
        query: mutations.createMessage,
        variables: {
          input: {
            conversationMessagesId: this.conversationId,
            text: message,
            type: Type.human,
          },
        },
      })
      .then();
  }

  getMessages(): Promise<BaseMessage[]> {
    console.log("Get messages");
    return this.client
      .graphql({
        query: queries.listMessages,
        variables: {
          filter: {
            conversationMessagesId: {
              eq: this.conversationId,
            },
          },
        },
      })
      .then((results) => {
        console.log({ results });
        const messages = results.data.listMessages.items.map((message) => {
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
      });
  }

  async clear(): Promise<void> {}
}
