import '../styles/globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
      // Wrapping all pages with my Layout
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
  );
}

export default MyApp
