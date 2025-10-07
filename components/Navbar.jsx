'use client';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Cart from './Cart';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="font-poppins text-2xl font-bold text-gray-800">
          <Link href="/">Aura</Link>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-roboto">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/shop" className="text-gray-600 hover:text-gray-800">
            Shop
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/login"
            className="hidden md:block font-roboto text-gray-600 hover:text-gray-800"
          >
            Sign In
          </Link>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative text-gray-600 hover:text-gray-800"
          >
            <AiOutlineShoppingCart size={24} />
            {totalQuantities > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantities}
              </span>
            )}
          </button>
        </div>
      </div>
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
