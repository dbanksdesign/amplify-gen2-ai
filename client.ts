import { generateClient } from "aws-amplify/data";
import { Schema } from "./amplify/data/resource";

export const client = generateClient<Schema>();
