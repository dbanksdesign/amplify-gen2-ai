import config from "@/../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config, { ssr: true });

export default function ConfigureAmplify() {
  return null;
}
