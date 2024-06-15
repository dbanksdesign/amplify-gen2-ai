import { type Schema } from "../resource";
import { summarize } from "backend-ai";

export const handler: Schema["textSummarizer"]["functionHandler"] = async (
  event
) => {
  const summarization = await summarize({
    instructions: `
    You are a helpful assistant tasked with provided a succinct summary for reviews of a vacation home listing site.
    The summarization should be between 20 and 100 words. 
    Only respond with the summarization.
    Each review will have a rating and text.
    `,
    data: event.arguments.text,
  });

  return summarization;
};
