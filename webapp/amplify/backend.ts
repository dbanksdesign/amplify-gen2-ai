import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, chatHandler, textSummarizer } from "./data/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";

const backend = defineBackend({
  auth,
  data,
  chatHandler,
  textSummarizer,
});

const weatherDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "WeatherAPIDataSource",
  "http://api.weatherstack.com"
);

const KnowledgeBaseDataSource =
  backend.data.resources.graphqlApi.addHttpDataSource(
    "KnowledgeBaseDataSource",
    "https://bedrock-runtime.us-east-1.amazonaws.com",
    {
      authorizationConfig: {
        signingRegion: "us-east-1",
        signingServiceName: "bedrock",
      },
    }
  );

KnowledgeBaseDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: ["*"],
    actions: ["bedrock:*"],
  })
);

// TODO: scope these policies down
backend.chatHandler.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:*"],
    resources: [
      `arn:aws:bedrock:${Stack.of(backend.data).region}::foundation-model/*`,
    ],
  })
);

// backend.chatHandler.resources.cfnResources.cfnFunction.runtimeManagementConfig = {}

backend.textSummarizer.resources.lambda.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: ["*"],
    actions: ["bedrock:InvokeModel"],
  })
);
