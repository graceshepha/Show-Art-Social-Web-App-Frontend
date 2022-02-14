import Navbar from '../components/NavBar'
import React, { ReactNode } from 'react';

/**
 * @description 
 * Layout of the app
 * 
 * @author Bly, Grâce Schephatia
 * 
 */

type Props = {
    children: ReactNode;
  };

const Layout = ({ 
    children,
 } : Props) => (

  <>
  <Navbar/>
  <main>
    {children}
  </main>
  </>
)

export default Layout;