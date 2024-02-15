/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChatHistory = /* GraphQL */ `mutation CreateChatHistory(
  $condition: ModelChatHistoryConditionInput
  $input: CreateChatHistoryInput!
) {
  createChatHistory(condition: $condition, input: $input) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatHistoryMutationVariables,
  APITypes.CreateChatHistoryMutation
>;
export const createConversation = /* GraphQL */ `mutation CreateConversation(
  $condition: ModelConversationConditionInput
  $input: CreateConversationInput!
) {
  createConversation(condition: $condition, input: $input) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConversationMutationVariables,
  APITypes.CreateConversationMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $condition: ModelMessageConditionInput
  $input: CreateMessageInput!
) {
  createMessage(condition: $condition, input: $input) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const deleteChatHistory = /* GraphQL */ `mutation DeleteChatHistory(
  $condition: ModelChatHistoryConditionInput
  $input: DeleteChatHistoryInput!
) {
  deleteChatHistory(condition: $condition, input: $input) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatHistoryMutationVariables,
  APITypes.DeleteChatHistoryMutation
>;
export const deleteConversation = /* GraphQL */ `mutation DeleteConversation(
  $condition: ModelConversationConditionInput
  $input: DeleteConversationInput!
) {
  deleteConversation(condition: $condition, input: $input) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConversationMutationVariables,
  APITypes.DeleteConversationMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $condition: ModelMessageConditionInput
  $input: DeleteMessageInput!
) {
  deleteMessage(condition: $condition, input: $input) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const updateChatHistory = /* GraphQL */ `mutation UpdateChatHistory(
  $condition: ModelChatHistoryConditionInput
  $input: UpdateChatHistoryInput!
) {
  updateChatHistory(condition: $condition, input: $input) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatHistoryMutationVariables,
  APITypes.UpdateChatHistoryMutation
>;
export const updateConversation = /* GraphQL */ `mutation UpdateConversation(
  $condition: ModelConversationConditionInput
  $input: UpdateConversationInput!
) {
  updateConversation(condition: $condition, input: $input) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConversationMutationVariables,
  APITypes.UpdateConversationMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $condition: ModelMessageConditionInput
  $input: UpdateMessageInput!
) {
  updateMessage(condition: $condition, input: $input) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
