import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";

export const client = generateClient<Schema>({
  authMode: "userPool",
});
