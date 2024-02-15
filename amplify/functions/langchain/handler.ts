import { AppSyncResolverHandler } from "aws-lambda";
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
// import { BedrockChat } from "@langchain/community/chat_models/bedrock/web";
import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { HumanMessage } from "@langchain/core/messages";
import { DynamoDBChatMessageHistory } from "@langchain/community/stores/message/dynamodb";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { AppSyncMessageHistory } from "./AppSyncMessageHistory";

type RequestType = {
    message: string;
    conversationId: string;
}

interface ClaudeResponse {
  completion: string;
  stop_reason: string;
  stop: string;
}

export const handler: AppSyncResolverHandler<RequestType, any>  = async (event, context) => {
  console.log({ event, context })
  console.log(JSON.stringify(process.env, null, 2))

  const hiz = new AppSyncMessageHistory({
    event,
    endpoint: 'https://t3vh72hgavdydgydekji7msdha.appsync-api.us-east-2.amazonaws.com/graphql'
  })


  const memory = new BufferMemory({
    chatHistory: hiz,
  });
  
  const model = new BedrockChat({
    model: "anthropic.claude-v2",
    region: "us-east-1",
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
  `)
  
  const chain = new ConversationChain({ llm: model, memory });
  chain.prompt = promptTemplate;


  // const model = new BedrockRuntimeClient({
  //   region: "us-east-1",
  // });

  const res = await chain.call({ input: event.arguments.message });
  console.log({ res });
  // const res2 = await chain.call({ input: "What did I just say my name was?" });
  // console.log({ res2 });
  return res.content;

  // const result = await model.send(
  //   new InvokeModelCommand({
  //     modelId: 'anthropic.claude-instant-v1',
  //     contentType: 'application/json',
  //     accept: '*/*',
  //     body: JSON.stringify({
  //       // we will call this multiple times so we need to be able to update the prompt
  //       // on each run
  //       prompt: `\n\nHuman: ${event.arguments.message}\n\nAssistant:`,
  //       // LLM costs are measured by Tokens, which are roughly equivalent
  //       // to 1 word. This option allows you to set the maximum amount of
  //       // tokens to return
  //       max_tokens_to_sample: 2000,
  //       // Temperature (1-0) is how 'creative' the LLM should be in its response
  //       // 1: deterministic, prone to repeating
  //       // 0: creative, prone to hallucinations
  //       temperature: 1,
  //       top_k: 250,
  //       top_p: 0.99,
  //       // This tells the model when to stop its response. LLMs
  //       // generally have a chat-like string of Human and Assistant message
  //       // This says stop when the Assistant (Claude) is done and expects
  //       // the human to respond
  //       stop_sequences: ['\n\nHuman:'],
  //       anthropic_version: 'bedrock-2023-05-31'
  //     })
  //   })
  // );

  // const decoder = new TextDecoder();
  // const str = JSON.parse(decoder.decode(result.body)) as ClaudeResponse;
  // const output = str.completion;
  // console.log(output);
  // return output;
}
