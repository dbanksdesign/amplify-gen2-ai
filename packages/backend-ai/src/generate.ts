import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  InferenceConfiguration,
} from "@aws-sdk/client-bedrock-runtime";

interface GenerateProps {
  instructions?: string;
  data?: unknown;
  credentials?: unknown;
  aiModel?: string;
  inferenceConfig?: InferenceConfiguration;
  returnShape: string;
}

const defaultInstructions = ``;

export async function generate({
  instructions = defaultInstructions,
  data,
  credentials,
  aiModel = "anthropic.claude-3-haiku-20240307-v1:0",
  inferenceConfig,
  returnShape,
}: GenerateProps) {
  // @ts-ignore
  const bedrock = new BedrockRuntimeClient({
    credentials,
    region: "us-east-1",
  });

  // could do some more prompt engineering here
  const system =
    instructions + `Respond with valid JSON in the form of: ` + returnShape;
  const messages: Message[] = [
    {
      role: "user",
      content: [
        {
          text: JSON.stringify(data),
        },
      ],
    },
  ];

  const result = await bedrock.send(
    new ConverseCommand({
      modelId: aiModel,
      messages,
      // @ts-ignore
      system,
      inferenceConfig,
    })
  );

  const output = result.output?.message?.content?.[0]?.text;
  let returnData;

  if (output) {
    try {
      returnData = JSON.parse(output);
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }

  // post-processing
  return returnData;
}
