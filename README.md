
There are a few ways to add conversational memory:

1. Use typebeast data construct with a specific structure. This would require creating a custom memory class for LangChain that call AppSync. Could have the benefit of subscriptions (I don't know if saving to DynamoDB would trigger a subscription if it doesn't go through AppSync)
2. Use DynamoDB directly. Would still need to set up the backend data schema in the same shape if we wanted to easily get the data in the frontend. There is already a DynamoDB memory class in LangChain. 
