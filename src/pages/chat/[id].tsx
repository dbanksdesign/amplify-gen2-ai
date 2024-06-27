import * as React from "react";
import { useParams } from "next/navigation";
import { useChat } from "@/useChat";
import { AIConversation } from "@/components/AIConversation";

// const { useChat } = generateAIHooks();

export default function ChatPage() {
  const params = useParams();
  const sessionId = params?.id as string;
  const props = useChat({ sessionId });

  return <AIConversation {...props} />;
}
