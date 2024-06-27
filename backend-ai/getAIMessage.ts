import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  Tool,
  InferenceConfiguration,
  ConverseCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

export interface GetAIMessageParams {
  // need to properly type this
  credentials?: unknown;
  systemPrompt?: string;
  messages: Message[];
  tools?: Tool[];
  aiModel?: string;
  inferenceConfig?: InferenceConfiguration;
}

export async function getAIMessage({
  aiModel = "anthropic.claude-3-haiku-20240307-v1:0",
  credentials,
  messages,
  tools,
  // TODO: better default
  systemPrompt = `You are a helpful assistant.`,
  // do some testing to get good default configs for different models or different scenarios?
  inferenceConfig = {
    temperature: 0.5,
    maxTokens: 2000,
  },
}: GetAIMessageParams) {
  // @ts-ignore
  const bedrock = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials,
  });

  const converseInput: ConverseCommandInput = {
    modelId: aiModel,
    system: [
      {
        text: systemPrompt,
      },
    ],
    messages,
    toolConfig: tools
      ? {
          tools,
        }
      : undefined,
    inferenceConfig,
  };
  console.log(JSON.stringify({ converseInput }, null, 2));

  const result = await bedrock.send(new ConverseCommand(converseInput));

  return result;
}
