# Amplify Gen2AI

## Overview

This is a sample Amplify Gen 2 application that uses Amazon Bedrock and Anthropic Claude for generative AI use cases.

- Amplify Gen 2
- NextJS
- Amazon Bedrock
- Anthropic Claude

## Getting started

If you do not have your enviornment set up for Amplify, follow the instructions here: https://docs.amplify.aws/react/start/

##

- Make sure you are in the right region

## Notes

### Monorepo setup

Currently in Amplify Gen2 there is no option to bundle the AWS SDK, and because Bedrock's Converse API is so new it is not yet in the Lambda runtime, we have to bundle a backend package ourselves. Once the Lambda SDK version is updated or `defineFunction` Amplify construct allows to bundle the SDK, you will no longer need to have a monorepo setup.
