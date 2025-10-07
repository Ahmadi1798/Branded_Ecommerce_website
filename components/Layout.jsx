import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Aura - Premium Ecommerce</title>
        <meta
          name="description"
          content="Your destination for premium, stylish products."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
