/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const SendMessage = /* GraphQL */ `query SendMessage($conversationId: String, $message: String) {
  SendMessage(conversationId: $conversationId, message: $message)
}
` as GeneratedQuery<
  APITypes.SendMessageQueryVariables,
  APITypes.SendMessageQuery
>;
export const getChatHistory = /* GraphQL */ `query GetChatHistory($id: ID!) {
  getChatHistory(id: $id) {
    createdAt
    id
    owner
    sessionId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatHistoryQueryVariables,
  APITypes.GetChatHistoryQuery
>;
export const getConversation = /* GraphQL */ `query GetConversation($id: ID!) {
  getConversation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetConversationQueryVariables,
  APITypes.GetConversationQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    conversationMessagesId
    createdAt
    id
    text
    type
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listChatHistories = /* GraphQL */ `query ListChatHistories(
  $filter: ModelChatHistoryFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChatHistories(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      owner
      sessionId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatHistoriesQueryVariables,
  APITypes.ListChatHistoriesQuery
>;
export const listConversations = /* GraphQL */ `query ListConversations(
  $filter: ModelConversationFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listConversations(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationsQueryVariables,
  APITypes.ListConversationsQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMessages(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      conversationMessagesId
      createdAt
      id
      text
      type
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
