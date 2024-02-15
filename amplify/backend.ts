import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { langChainFunction } from './functions/langchain/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  langChainFunction
});

// grant the lambda function access to invoke bedrock
backend.langChainFunction.resources.lambda.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: ['*'],
    actions: ['bedrock:InvokeModel'],
  })
);

backend.langChainFunction.resources.lambda.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: ['*'],
    actions: ['dynamodb:*'],
  })
);
