import { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";

import { Header } from "../components";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
