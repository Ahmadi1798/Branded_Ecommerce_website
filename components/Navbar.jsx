'use client';

import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="flex justify-between my-1.5 mx-[18px] relative ">
      <p className="text-gray-400 text-xl">
        <Link href="/">Branded Store</Link>
      </p>
      <button
        onClick={() => setShowCart(!showCart)}
        className="relative transform border-none bg-transparent cursor-pointer text-2xl transition duration-300 ease-in-out hover:scale-110"
      >
        <AiOutlineShoppingCart className="text-gray-400" />
        <span className="absolute -top-2 -right-2 text-xs text-white bg-[#f02d34] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
          {totalQuantities}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};
export default Navbar;
