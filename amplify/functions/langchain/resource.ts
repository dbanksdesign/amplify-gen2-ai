import { defineFunction } from "@aws-amplify/backend";

export const langChainFunction = defineFunction({
    timeoutSeconds: 30,
    name: 'my-langchain-fn',
    // environment: {
    //     PROXY_FN_NAME: "..."
    // }
    // entry: url.fileURLToPath(new URL("handler.ts", import.meta.url)),
    // optional name and entry point
});
