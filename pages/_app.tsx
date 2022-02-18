import 'styles/globals.css';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '@/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
