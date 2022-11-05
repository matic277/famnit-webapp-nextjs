import '../styles/globals.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
      // Wrapping all pages with my Layout
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp
