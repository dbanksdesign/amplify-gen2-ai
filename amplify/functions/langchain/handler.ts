import { AppSyncResolverHandler } from "aws-lambda";
import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { AppSyncMessageHistory } from "./AppSyncMessageHistory";

type RequestType = {
  message: string;
  conversationId: string;
};

export const handler: AppSyncResolverHandler<RequestType, any> = async (
  event,
  context
) => {
  // Get the AppSync endpoint and API key from the request
  // because this lambda is being called as a Lambda data source from AppSync
  const endpoint = `https://${event.request.headers.host}/graphql`;
  const apiKey = event.request.headers["x-api-key"]!;

  const chatHistory = new AppSyncMessageHistory({
    event,
    endpoint,
    apiKey,
  });

  const memory = new BufferMemory({
    chatHistory,
  });

  const model = new BedrockChat({
    model: "anthropic.claude-v2",
    region: "us-east-1",
    maxTokens: 2000,
  });

  const promptTemplate = PromptTemplate.fromTemplate(`
  Human: The following is a friendly conversation between a human and an AI.
The AI is talkative and provides lots of specific details from its context. If the AI does not know
the answer to a question, it truthfully says it does not know.

Current conversation:
<conversation_history>
{history}
</conversation_history>

Here is the human's next reply:
<human_reply>
{input}
</human_reply>

Assistant:
  `);

  const chain = new ConversationChain({ llm: model, memory });
  chain.prompt = promptTemplate;

  const res = await chain.call({ input: event.arguments.message });

  return res.content;
};
