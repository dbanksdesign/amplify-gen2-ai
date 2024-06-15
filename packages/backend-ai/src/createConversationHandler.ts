import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAIResponse } from "./getAIResponse";
import { saveMessage } from "./saveMessage";
import { createMessenger } from "./message";
import { listingsTool, reviewsTool, weatherTool } from "./tool";

type ConversationHandler = (event: any) => void;

const gql = `
input ModelStringInput {
	ne: String
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	contains: String
	notContains: String
	between: [String]
	beginsWith: String
}

input ModelIntInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	between: [Int]
	attributeExists: Boolean
}

input ModelFloatInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	between: [Float]
	attributeExists: Boolean
}

input ModelIDInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
	attributeExists: Boolean
}

input ModelListingFilterInput {
	title: ModelStringInput
	description: ModelStringInput
	amenities: ModelStringInput
	numBedrooms: ModelIntInput
	bedrooms: ModelStringInput
	numBathrooms: ModelIntInput
	images: ModelStringInput
	type: ModelStringInput
	sleeps: ModelIntInput
	sqft: ModelIntInput
	hostId: ModelIDInput
	price: ModelFloatInput
	city: ModelStringInput
	state: ModelStringInput
	zip: ModelStringInput
	id: ModelIDInput
	createdAt: ModelStringInput
	updatedAt: ModelStringInput
	and: [ModelListingFilterInput]
	or: [ModelListingFilterInput]
	not: ModelListingFilterInput
	owner: ModelStringInput
}
`;

export function createConversationHandler(): ConversationHandler {
  return async function (event) {
    const endpoint = `https://${event.request.headers.host}/graphql`;
    const authToken = event.request.headers.authorization;
    const { sessionId, message, context, uiComponents } = event.arguments;

    const { getMessages, saveMessage } = createMessenger({
      sessionId,
      endpoint,
      authToken,
      routeName: "",
    });

    const messages = await getMessages();

    Amplify.configure({
      API: {
        GraphQL: {
          endpoint,
          defaultAuthMode: "lambda",
        },
      },
    });

    const client = generateClient({
      authMode: "lambda",
      authToken,
      headers: {
        Authorization: authToken,
      },
    });

    const { aiModel, instructions = "you are a helpful assistant" } =
      // @ts-ignore
      process.env;

    const result = await getAIResponse({
      aiModel,
      instructions,
      uiComponents,
      messages: [
        // message is already saved??
        ...messages,
      ],
      // TODO: somehow go from backend definition to tools
      tools: [
        // reviewsTool({ client }),
        // listingsTool({ client }),
        // @ts-ignore
        weatherTool({ client }),
      ],
      onMessage: async (args) => {
        console.log("on message");
        await saveMessage({
          message: args.output?.message!,
        });
        console.log(JSON.stringify(args, null, 2));
      },
      onToolUse: async (args) => {
        console.log("on Tool use");
        console.log(JSON.stringify(args, null, 2));
      },
      onUIUse: (args) => {
        console.log("on UI use");
        console.log(JSON.stringify(args, null, 2));
      },
    });
    // console.log(JSON.stringify(result, null, 2));
  };
}
