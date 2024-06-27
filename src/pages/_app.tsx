import "@aws-amplify/ui-react/styles/reset.css";
import "@aws-amplify/ui-react/styles.css";
import "@/styles/globals.scss";
import "@fontsource-variable/inter";
import type { AppProps } from "next/app";
// import { Amplify } from "aws-amplify";
// import config from "@/../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Layout } from "@/components/Layout";
import { ColorModeProvider } from "@/components/ColorModeProvider";
import ConfigureAmplify from "@/components/ConfigureAmplify";

// Amplify.configure({ ...config });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <ConfigureAmplify />
      <Authenticator>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Authenticator>
    </ColorModeProvider>
  );
}
