// components/Layout.js

import React from 'react';
import NavBar from './NavBar'; // Corrected import statement
import { Container } from 'react-bootstrap'; // Example usage of Bootstrap Container

const Layout = ({ children }) => {
  return (
    <>
      <NavBar /> {/* Use correct component name here */}
      <Container className="mt-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;
