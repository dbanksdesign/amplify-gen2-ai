import { Button, Flex, View } from "@aws-amplify/ui-react";
import { LuSunMedium, LuMoon } from "react-icons/lu";

import { signOut } from "aws-amplify/auth";
import { useColorMode } from "./ColorModeProvider";
import { AmplifyLogo } from "./Logo";
import ChatLayout from "./ChatLayout";
import Link from "next/link";

const colorModeMap = {
  light: <LuSunMedium />,
  dark: <LuMoon />,
  system: null,
};

export const Layout = ({ children }: React.PropsWithChildren) => {
  const { setColorMode, colorMode = "light" } = useColorMode();
  const handleSignOut = () => {
    signOut();
  };

  const handleColorMode = () => {
    setColorMode?.(colorMode === "light" ? "dark" : "light");
  };

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      gap="0"
      backgroundColor="background.primary"
    >
      <View className="app-header">
        <Flex direction="row" alignItems="center">
          <Flex direction="row" alignItems="center" flex="1">
            <Link href="/">
              <AmplifyLogo />
            </Link>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Button
              size="small"
              className="icon-button"
              variation="link"
              onClick={handleColorMode}
            >
              {colorModeMap[colorMode]}
            </Button>
            <Button size="small" onClick={handleSignOut}>
              Sign out
            </Button>
          </Flex>
        </Flex>
      </View>
      <View flex="1" overflow="hidden">
        <ChatLayout>{children}</ChatLayout>
      </View>
    </Flex>
  );
};
