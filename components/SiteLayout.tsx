import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/NavBar';

/**
 * @description
 * Layout of the app
 *
 * @author Bly, Grâce Schephatia
 *
 */
type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const DEFAULT_SITE_TITLE = 'Art showcase';

const Layout = ({ children, title, description }: Props) => (
  <>
    <Head>
      <title>
        {title ? `${title} - ${DEFAULT_SITE_TITLE}` : DEFAULT_SITE_TITLE}
      </title>
      <meta name="description" content={description} />
    </Head>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
