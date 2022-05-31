import '../styles/globals.css';
import Layout from '../components/Layout';
import CountProvider from '../context/CountProvider';

function MyApp({ Component, pageProps }) {
  return (
    <CountProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountProvider>
  );
}

export default MyApp;
