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
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      {dimensions.width > 0 && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}
      <div className="max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <BsBagCheckFill className="text-green-500 text-8xl" />
        </div>
        <h1 className="font-poppins text-4xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="font-roboto text-lg text-gray-600 mb-2">
          Your order has been successfully placed.
        </p>
        <p className="font-roboto text-gray-600 mb-8">
          A receipt has been sent to your email.
        </p>
        <Link href="/">
          <button
            type="button"
            className="font-roboto bg-gray-800 text-white py-3 px-8 rounded-lg text-lg hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
