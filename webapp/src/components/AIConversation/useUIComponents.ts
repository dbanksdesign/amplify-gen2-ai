import * as React from "react";
import { AIConversationContext } from "./Provider";

export const useUIComponents = () => {
  return React.useContext(AIConversationContext);
};
