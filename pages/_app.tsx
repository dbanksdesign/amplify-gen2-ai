import "@aws-amplify/ui-react/styles.css";
import "@/styles/globals.scss";
import "@fontsource-variable/inter";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Layout } from "@/components/Layout";
import { ColorModeProvider } from "@/components/ColorModeProvider";

Amplify.configure(config);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Authenticator>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Authenticator>
    </ColorModeProvider>
  );
}
