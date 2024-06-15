// import { Claude3Sonnet } from "@aws-amplify/data-schema";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

interface SummarizeProps {
  instructions?: string;
  data: any;
  modelId?: string;
  region?: string;
  prompt?: string;
  temperature?: number;
  credentials?: any;
}

/**
 * Summarization LLM call
 */
export async function summarize({
  region = "us-east-1",
  modelId = "anthropic.claude-3-haiku-20240307-v1:0",
  instructions = `
  You are a helpful assistant tasked with provided a succinct summary of provided data.
  `,
  data,
  temperature = 0,
  credentials,
}: // ...rest
SummarizeProps) {
  const bedrock = new BedrockRuntimeClient({
    region,
    credentials,
  });

  // invoke LLM
  const result = await bedrock.send(
    new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "*/*",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: JSON.stringify(data),
              },
            ],
          },
        ],
        temperature,
        system: instructions,
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 2000,
      }),
    })
  );

  const decoder = new TextDecoder();
  const rez = JSON.parse(decoder.decode(result.body)) as any;
  const output = rez.content[0].text as string;

  // parse results?

  // return
  return output;
}
