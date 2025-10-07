import './globals.css';

import { StateContext } from '../../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../../components';

export const metadata = {
  title: 'AURA E-Commerce',
  description: 'Elevate your shopping experience with AURA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StateContext>
          <Layout>
            <Toaster />
            {children}
          </Layout>
        </StateContext>
      </body>
    </html>
  );
}
