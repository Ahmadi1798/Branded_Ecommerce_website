import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Layout } from '../../components';
import { StateContext } from '../../context/StateContext';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Branded Store - Premium E-commerce',
  description: 'Your premium e-commerce destination for quality products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StateContext>
          <Toaster />
          <Layout> {children}</Layout>
        </StateContext>
      </body>
    </html>
  );
}
