import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
  Tool,
  InferenceConfiguration,
  ConverseCommandOutput,
} from "@aws-sdk/client-bedrock-runtime";
import { getAIMessage, GetAIMessageParams } from "./getAIMessage";
import { UIComponent, uiComponentsToTools } from "./uiComponentToTool";

export interface ToolTool extends Tool.ToolSpecMember {
  run: (args: any) => Promise<string>;
}

interface GetAIResponseParams extends GetAIMessageParams {
  instructions?: string;
  messages: Message[];
  tools?: ToolTool[];
  context?: any;
  uiComponents?: UIComponent[];
  onToolUse?: (args: any) => void;
  onMessage?: (args: ConverseCommandOutput) => void;
  onUIUse?: (args: any) => void;
}

const defaultSystemPrompt = `
When possible, use a UI component tool to display a rich response to the user.
When you use a UI component tool, don't tell the user that you are using a tool.
When you use a tool that queries for data, tell the user that you are searching for
the information, but don't mention the tool name.
`;

export async function getAIResponse({
  instructions,
  messages,
  tools = [],
  context,
  uiComponents = [],
  aiModel,
  credentials,
  onMessage,
  onToolUse,
  onUIUse,
}: GetAIResponseParams) {
  // const systemPrompt = defaultSystemPrompt + instructions;
  const systemPrompt = instructions;
  let response = await getAIMessage({
    // TODO: add some more prompt templating here
    systemPrompt,
    aiModel,
    credentials,
    messages,
    // TODO: add ui components as "tools"
    tools: [...tools, ...uiComponentsToTools(uiComponents)],
  });

  await onMessage?.(response);

  // console.log(JSON.stringify(response, null, 2));

  // figure out if tool use is a UI component or actual tool

  // figure out if LLM wants to use a tool
  const toolUse = response.output?.message?.content?.find((content) => {
    return content.toolUse;
  });

  if (toolUse) {
    console.log(`running tool`);
    console.log(JSON.stringify(toolUse, null, 2));

    const { input, name, toolUseId } = toolUse.toolUse!;
    if (name?.startsWith("UI")) {
      onUIUse?.({ input, name });
    } else {
      // await onToolUse?.({ input, name, toolUseId });
      const tool = tools?.find((tool) => tool.toolSpec.name === name);
      const toolResult = await tool?.run(input);

      console.log(`tool returned: ${toolResult}`);

      const message = {
        role: "user",
        content: [
          {
            toolResult: {
              toolUseId,
              content: [
                {
                  text: toolResult ?? "",
                },
              ],
            },
          },
        ],
      };

      await onMessage?.({
        $metadata: {},
        usage: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
        },
        stopReason: "end_turn",
        output: {
          // @ts-ignore
          message,
        },
      });

      response = await getAIResponse({
        systemPrompt,
        aiModel,
        instructions,
        tools,
        uiComponents,
        messages: [
          ...messages,
          response.output?.message!,
          {
            role: "user",
            content: [
              {
                toolResult: {
                  toolUseId,
                  content: [
                    {
                      text: toolResult ?? "",
                    },
                  ],
                },
              },
            ],
          },
        ],
      });
      await onMessage?.(response);
    }
  }

  return response;
}
