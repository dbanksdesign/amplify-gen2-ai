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

export function createTool() {}

export const listingsTool = ({
  client,
}: {
  // @ts-ignore
  client: ReturnType<typeof generateClient>;
}): ToolTool => {
  return {
    run: async (args) => {
      console.log("QueryListings");
      console.log(JSON.stringify(args, null, 2));
      try {
        const result = await client.graphql({
          query: `query MyQuery {
          listListings(filter: ${args.filter}) {
            items {
              amenities
              title
              description
              id
            }
            nextToken
          }
        }`,
        });
        console.log(JSON.stringify(result, null, 2));
        // @ts-ignore
        return JSON.stringify(result.data.listListings);
      } catch (error) {
        console.log(error);
        return JSON.stringify(error);
      }
    },
    toolSpec: {
      name: "QueryListings",
      description: `A GraphQL filter. For example: "{ description: {contains: "parking"}}`,
      inputSchema: {
        json: {
          type: "object",
          properties: {
            filter: {
              type: "string",
            },
            // or: {
            //   type: "array",
            //   description: "",
            //   items: {
            //     type: "object",
            //     properties: {
            //       description: {
            //         type: "object",
            //         properties: {
            //           contains: {
            //             type: "string",
            //           },
            //         },
            //       },
            //       ammenities: {
            //         type: "object",
            //         properties: {
            //           contains: {
            //             type: "string",
            //           },
            //         },
            //       },
            //     },
            //   },
            // },
          },
        },
      },
    },
  };
};

export const reviewsTool = ({
  client,
}: {
  client: ReturnType<typeof generateClient>;
}): ToolTool => {
  return {
    run: async (args) => {
      console.log("QueryReviews");
      console.log(JSON.stringify(args, null, 2));
      try {
        const result = await client.graphql({
          query: `query MyQuery {
          listReviews(filter: { listingId: { eq: "${args.listingId}" } }) {
            items {
              score
              text
              listingId
              id
            }
            nextToken
          }
        }`,
        });
        console.log(JSON.stringify(result, null, 2));
        // @ts-ignore
        return JSON.stringify(result.data.listReviews);
      } catch (error) {
        console.log(error);
        return JSON.stringify(error);
      }
    },
    toolSpec: {
      name: "QueryReviews",
      description: `A GraphQL query to find reviews based on a listing`,
      inputSchema: {
        json: {
          type: "object",
          properties: {
            listingId: {
              type: "string",
            },
          },
        },
      },
    },
  };
};

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
