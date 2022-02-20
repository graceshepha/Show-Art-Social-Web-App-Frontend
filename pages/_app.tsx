import 'styles/globals.css';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import SiteLayout from '@/SiteLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </UserProvider>
  );
}

export default MyApp;
