import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/NavBar/NavBar';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

/** @ignore */
const DEFAULT_SITE_TITLE = 'Art showcase';

/**
 * Layout de l'application.
 *
 * @author Bly, Grâce Schephatia
 */
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
