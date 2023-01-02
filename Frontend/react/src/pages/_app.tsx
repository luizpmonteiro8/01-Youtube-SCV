import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { getTheme } from "theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={getTheme()}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
