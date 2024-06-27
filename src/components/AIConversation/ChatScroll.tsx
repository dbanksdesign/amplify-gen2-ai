import * as React from "react";
import { Flex, ScrollView } from "@aws-amplify/ui-react";

export const ChatScroll = ({ children }: React.PropsWithChildren) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll the scrollview to the bottom on each render
  React.useLayoutEffect(() => {
    scrollRef.current?.scroll({
      // @ts-ignore
      top: scrollRef.current?.firstChild?.offsetHeight,
    });
  }, [children]);
  return (
    <ScrollView ref={scrollRef} flex="1" padding="large">
      <Flex direction="column">{children}</Flex>
    </ScrollView>
  );
};
