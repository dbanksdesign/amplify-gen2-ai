import { Tool } from "@aws-sdk/client-bedrock-runtime";

type UIComponentProp =
  | {
      type: "boolean" | "number";
      description?: string;
    }
  | {
      type: "object";
      properties: UIComponentProp;
      description?: string;
    }
  | {
      type: "string";
      enum?: string[];
      description?: string;
    };

export interface UIComponent {
  name: string;
  description?: string;
  props: Record<string, UIComponentProp>;
}

export function uiComponentsToTools(
  uiComponents: UIComponent[],
): Tool.ToolSpecMember[] {
  return uiComponents.map((comp) => {
    return {
      toolSpec: {
        name: `UI_${comp.name}`,
        description: "A UI component you can use display to the user",
        inputSchema: {
          json: {
            type: "object",
            properties: comp.props,
          },
        },
      },
    };
  });
}
