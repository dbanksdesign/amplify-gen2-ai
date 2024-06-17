import { generateClient } from "aws-amplify/api";
import { ToolTool } from "./getAIResponse";

export interface ToolDefinition {
  name: string;
  description: string;
  arguments: any;
}

export interface Tool extends ToolDefinition {
  run: (args: any) => string | Promise<string>;
}

export const weatherTool = ({
  client,
}: {
  client: ReturnType<typeof generateClient>;
}): ToolTool => {
  return {
    run: async (args) => {
      const result = await client.graphql({
        query: `
          query MyQuery($location: String!) {
            getWeather(location: $location)
          }
        `,
        variables: args,
      });

      // @ts-ignore
      return result.data.getWeather;
    },
    toolSpec: {
      name: "getWeather",
      description: "API used to get the weather based on a location",
      inputSchema: {
        json: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description:
                "The location. It can be a city, state, or zip code.",
            },
          },
          required: ["location"],
        },
      },
    },
  };
};
