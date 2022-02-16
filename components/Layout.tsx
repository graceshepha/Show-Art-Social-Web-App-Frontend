import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '../components/NavBar';

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

const siteTitle = 'Art showcase';

const Layout = ({ children, title, description }: Props) => (
  <>
    <Head>
      <title>{title ? `${title} - ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description} />
    </Head>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
