import '../styles/globals.css'
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
