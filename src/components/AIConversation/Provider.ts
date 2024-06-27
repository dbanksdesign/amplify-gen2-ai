import * as React from "react";
import { UIComponent } from "./types";

export interface AIConversationContextProps {
  uiComponents: Record<string, UIComponent>;
  context: Record<string, any>;
}

export const AIConversationContext =
  React.createContext<AIConversationContextProps>({
    uiComponents: {},
    context: {},
  });
