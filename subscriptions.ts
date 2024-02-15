/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChatHistory = /* GraphQL */ `subscription OnCreateChatHistory(
  $filter: ModelSubscriptionChatHistoryFilterInput
  $owner: String
) {
  onCreateChatHistory(filter: $filter, owner: $owner) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatHistorySubscriptionVariables,
  APITypes.OnCreateChatHistorySubscription
>;
export const onCreateConversation = /* GraphQL */ `subscription OnCreateConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onCreateConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateConversationSubscriptionVariables,
  APITypes.OnCreateConversationSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onCreateMessage(filter: $filter) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onDeleteChatHistory = /* GraphQL */ `subscription OnDeleteChatHistory(
  $filter: ModelSubscriptionChatHistoryFilterInput
  $owner: String
) {
  onDeleteChatHistory(filter: $filter, owner: $owner) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatHistorySubscriptionVariables,
  APITypes.OnDeleteChatHistorySubscription
>;
export const onDeleteConversation = /* GraphQL */ `subscription OnDeleteConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onDeleteConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteConversationSubscriptionVariables,
  APITypes.OnDeleteConversationSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
  onDeleteMessage(filter: $filter) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onUpdateChatHistory = /* GraphQL */ `subscription OnUpdateChatHistory(
  $filter: ModelSubscriptionChatHistoryFilterInput
  $owner: String
) {
  onUpdateChatHistory(filter: $filter, owner: $owner) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatHistorySubscriptionVariables,
  APITypes.OnUpdateChatHistorySubscription
>;
export const onUpdateConversation = /* GraphQL */ `subscription OnUpdateConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onUpdateConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateConversationSubscriptionVariables,
  APITypes.OnUpdateConversationSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onUpdateMessage(filter: $filter) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
