// pages/_app.js

import React from 'react';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
