'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';

import { useStateContext } from '../../../context/StateContext';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // ... existing code ...
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {dimensions.width > 0 && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}
      <div className="p-10 bg-white rounded-lg shadow-xl text-center max-w-md w-full">
        <p className="flex justify-center text-green-500 text-7xl mb-4">
          <BsBagCheckFill />
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 mb-4">Check your email for the receipt.</p>
        <p className="text-sm text-gray-500 mb-8">
          If you have any questions, feel free to reach out to us at{' '}
          <a
            className="text-indigo-600 hover:underline"
            href="mailto:support@example.com"
          >
            support@example.com
          </a>
        </p>
        <Link href="/">
          <button
            type="button"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
