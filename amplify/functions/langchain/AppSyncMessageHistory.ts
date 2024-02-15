import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import {
  AIMessage,
  BaseListChatMessageHistory,
  BaseMessage,
  HumanMessage,
} from "langchain/schema";
import { Schema } from "../../data/resource";
import { AppSyncResolverEvent } from "aws-lambda";
import config from "../../../amplifyconfiguration.json";

interface AppSyncMessageHistoryProps {
  endpoint: string;
  event: AppSyncResolverEvent<{ message: string; conversationId: string }>;
  // event: {
  //   headers: {
  //     authorization: string;
  //   };
  // };
}

export class AppSyncMessageHistory extends BaseListChatMessageHistory {
  lc_namespace = ["foo"];
  readonly client;
  readonly conversationId;
  readonly message;

  constructor(props: AppSyncMessageHistoryProps) {
    super(props);
    const { endpoint } = props;
    const { conversationId, message } = props.event.arguments;
    this.conversationId = conversationId;
    this.message = message;

    Amplify.configure(config);

    this.client = generateClient<Schema>({});
  }

  addMessage(message: BaseMessage): Promise<void> {
    console.log("BASE MESSAGE");
    console.log({ message });
    const foo = message.toDict();

    return this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message.content as string,
      // @ts-ignore
      type: foo.type,
    }).then();
    // todo: figure this out, feels weird
  }

  addAIMessage(message: string): Promise<void> {
    console.log("AI MESSAGE");
    console.log({ message });
    return this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message,
      type: "ai",
    }).then();
  }

  addUserMessage(message: string): Promise<void> {
    console.log("User MESSAGE");
    console.log({ message });
    return this.client.models.Message.create({
      conversationMessagesId: this.conversationId,
      text: message,
      type: "human",
      // text: message.content,
    }).then();
  }

  getMessages(): Promise<BaseMessage[]> {
    return this.client.models.Message.list({
      filter: {
        conversationMessagesId: {
          eq: this.conversationId,
        },
      },
    }).then((results) => {
      console.log({ results });
      const messages = results.data.map((message) => {
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
