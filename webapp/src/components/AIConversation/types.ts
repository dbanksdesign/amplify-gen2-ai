type UIComponentProp =
  | {
      type: "boolean" | "number";
      description?: string;
    }
  | {
      type: "object";
      properties: UIComponentProp;
      description?: string;
    }
  | {
      type: "string";
      enum?: string[];
      description?: string;
    };

export interface UIComponent {
  name: string;
  description?: string;
  props: Record<string, UIComponentProp>;
  // TODO: this should be required for the user to define, but
  // we don't need to send it over the wire
  component?: React.ComponentType;
}
