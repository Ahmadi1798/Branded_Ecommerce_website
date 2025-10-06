import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Branded Store</title>
        <meta
          name="description"
          content="Your premium e-commerce destination"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
