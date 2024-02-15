/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ChatHistory = {
  __typename: "ChatHistory",
  createdAt: string,
  id: string,
  owner?: string | null,
  sessionId?: string | null,
  updatedAt: string,
};

export type Conversation = {
  __typename: "Conversation",
  createdAt: string,
  id: string,
  messages?: ModelMessageConnection | null,
  updatedAt: string,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  conversationMessagesId?: string | null,
  createdAt: string,
  id: string,
  text?: string | null,
  type?: Type | null,
  updatedAt: string,
};

export enum Type {
  bar = "bar",
  foo = "foo",
}


export type ModelChatHistoryFilterInput = {
  and?: Array< ModelChatHistoryFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelChatHistoryFilterInput | null,
  or?: Array< ModelChatHistoryFilterInput | null > | null,
  owner?: ModelStringInput | null,
  sessionId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelChatHistoryConnection = {
  __typename: "ModelChatHistoryConnection",
  items:  Array<ChatHistory | null >,
  nextToken?: string | null,
};

export type ModelConversationFilterInput = {
  and?: Array< ModelConversationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelConversationFilterInput | null,
  or?: Array< ModelConversationFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelConversationConnection = {
  __typename: "ModelConversationConnection",
  items:  Array<Conversation | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  and?: Array< ModelMessageFilterInput | null > | null,
  conversationMessagesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelMessageFilterInput | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  text?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTypeInput = {
  eq?: Type | null,
  ne?: Type | null,
};

export type ModelChatHistoryConditionInput = {
  and?: Array< ModelChatHistoryConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelChatHistoryConditionInput | null,
  or?: Array< ModelChatHistoryConditionInput | null > | null,
  owner?: ModelStringInput | null,
  sessionId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChatHistoryInput = {
  createdAt?: string | null,
  id?: string | null,
  owner?: string | null,
  sessionId?: string | null,
  updatedAt?: string | null,
};

export type ModelConversationConditionInput = {
  and?: Array< ModelConversationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelConversationConditionInput | null,
  or?: Array< ModelConversationConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateConversationInput = {
  createdAt?: string | null,
  id?: string | null,
  updatedAt?: string | null,
};

export type ModelMessageConditionInput = {
  and?: Array< ModelMessageConditionInput | null > | null,
  conversationMessagesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelMessageConditionInput | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  text?: ModelStringInput | null,
  type?: ModelTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMessageInput = {
  conversationMessagesId?: string | null,
  createdAt?: string | null,
  id?: string | null,
  text?: string | null,
  type?: Type | null,
  updatedAt?: string | null,
};

export type DeleteChatHistoryInput = {
  id: string,
};

export type DeleteConversationInput = {
  id: string,
};

export type DeleteMessageInput = {
  id: string,
};

export type UpdateChatHistoryInput = {
  createdAt?: string | null,
  id: string,
  owner?: string | null,
  sessionId?: string | null,
  updatedAt?: string | null,
};

export type UpdateConversationInput = {
  createdAt?: string | null,
  id: string,
  updatedAt?: string | null,
};

export type UpdateMessageInput = {
  conversationMessagesId?: string | null,
  createdAt?: string | null,
  id: string,
  text?: string | null,
  type?: Type | null,
  updatedAt?: string | null,
};

export type ModelSubscriptionChatHistoryFilterInput = {
  and?: Array< ModelSubscriptionChatHistoryFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionChatHistoryFilterInput | null > | null,
  sessionId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionConversationFilterInput = {
  and?: Array< ModelSubscriptionConversationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionConversationFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  conversationMessagesId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  text?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type SendMessageQueryVariables = {
  conversationId?: string | null,
  message?: string | null,
};

export type SendMessageQuery = {
  SendMessage?: string | null,
};

export type GetChatHistoryQueryVariables = {
  id: string,
};

export type GetChatHistoryQuery = {
  getChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetConversationQueryVariables = {
  id: string,
};

export type GetConversationQuery = {
  getConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type ListChatHistoriesQueryVariables = {
  filter?: ModelChatHistoryFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatHistoriesQuery = {
  listChatHistories?:  {
    __typename: "ModelChatHistoryConnection",
    items:  Array< {
      __typename: "ChatHistory",
      createdAt: string,
      id: string,
      owner?: string | null,
      sessionId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListConversationsQueryVariables = {
  filter?: ModelConversationFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListConversationsQuery = {
  listConversations?:  {
    __typename: "ModelConversationConnection",
    items:  Array< {
      __typename: "Conversation",
      createdAt: string,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      conversationMessagesId?: string | null,
      createdAt: string,
      id: string,
      text?: string | null,
      type?: Type | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateChatHistoryMutationVariables = {
  condition?: ModelChatHistoryConditionInput | null,
  input: CreateChatHistoryInput,
};

export type CreateChatHistoryMutation = {
  createChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: CreateConversationInput,
};

export type CreateConversationMutation = {
  createConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: CreateMessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type DeleteChatHistoryMutationVariables = {
  condition?: ModelChatHistoryConditionInput | null,
  input: DeleteChatHistoryInput,
};

export type DeleteChatHistoryMutation = {
  deleteChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: DeleteConversationInput,
};

export type DeleteConversationMutation = {
  deleteConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: DeleteMessageInput,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type UpdateChatHistoryMutationVariables = {
  condition?: ModelChatHistoryConditionInput | null,
  input: UpdateChatHistoryInput,
};

export type UpdateChatHistoryMutation = {
  updateChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: UpdateConversationInput,
};

export type UpdateConversationMutation = {
  updateConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: UpdateMessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type OnCreateChatHistorySubscriptionVariables = {
  filter?: ModelSubscriptionChatHistoryFilterInput | null,
  owner?: string | null,
};

export type OnCreateChatHistorySubscription = {
  onCreateChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnCreateConversationSubscription = {
  onCreateConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatHistorySubscriptionVariables = {
  filter?: ModelSubscriptionChatHistoryFilterInput | null,
  owner?: string | null,
};

export type OnDeleteChatHistorySubscription = {
  onDeleteChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnDeleteConversationSubscription = {
  onDeleteConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatHistorySubscriptionVariables = {
  filter?: ModelSubscriptionChatHistoryFilterInput | null,
  owner?: string | null,
};

export type OnUpdateChatHistorySubscription = {
  onUpdateChatHistory?:  {
    __typename: "ChatHistory",
    createdAt: string,
    id: string,
    owner?: string | null,
    sessionId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnUpdateConversationSubscription = {
  onUpdateConversation?:  {
    __typename: "Conversation",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    conversationMessagesId?: string | null,
    createdAt: string,
    id: string,
    text?: string | null,
    type?: Type | null,
    updatedAt: string,
  } | null,
};
