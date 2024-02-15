import * as React from 'react'
import { Flex, TextAreaField, Button } from "@aws-amplify/ui-react";
import { LuSend } from "react-icons/lu";
import { useAutosizeTextarea } from './useAutosizeTextarea';

interface ChatPropmtProps {
  handleSubmit: (value: string) => void;
}

export const ChatPrompt = ({ handleSubmit }: React.PropsWithChildren<ChatPropmtProps>) => {
  const [value, setValue] = React.useState("");
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const _handleSubmit = React.useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(value);
    setValue('');
  }, [value, handleSubmit]);

  const handleKeyDown = React.useCallback((evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      if (evt.shiftKey) {

      } else {
        evt.preventDefault();
        handleSubmit(value);
        setValue('');
      }

    }
  }, [value, handleSubmit])

  return (
    <Flex className="amplify-chat-prompt" as="form" direction="row" onSubmit={_handleSubmit}>
      <TextAreaField onKeyDown={handleKeyDown} ref={textAreaRef} name="message" label="message" labelHidden flex="1" value={value} onChange={handleChange} rows={1} />
      <Button type="submit" variation="primary" fontSize="large">
        <LuSend />
      </Button>
    </Flex>
  )
}
