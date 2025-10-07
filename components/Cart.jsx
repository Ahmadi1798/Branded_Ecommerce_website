'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import axios from 'axios';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    toast.loading('Redirecting...');

    try {
      const response = await axios.post('/api/stripe', { cartItems });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Error creating checkout session.');
      console.error('Checkout error:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50"
      onClick={() => setShowCart(false)}
    >
      <div
        ref={cartRef}
        className="absolute right-0 top-0 w-full max-w-md h-full bg-white shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft size={24} />
          </button>
          <h2 className="font-poppins text-xl font-semibold text-gray-800">
            Your Cart ({totalQuantities})
          </h2>
        </div>

        {/* Empty Cart */}
        {cartItems.length < 1 && (
          <div className="flex flex-col items-center justify-center text-center h-full p-6">
            <AiOutlineShopping size={120} className="text-gray-300" />
            <h3 className="font-poppins text-2xl font-semibold mt-6 text-gray-800">
              Your cart is empty
            </h3>
            <p className="font-roboto text-gray-600 mt-2">
              Looks like you haven't added anything yet.
            </p>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="mt-8 bg-gray-800 text-white font-roboto font-semibold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Start Shopping
              </button>
            </Link>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex items-center gap-4" key={item._id}>
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(item?.image[0])}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h5 className="font-poppins font-semibold text-gray-800">
                    {item.name}
                  </h5>
                  <p className="font-roboto text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        className="p-2 text-gray-500 hover:bg-gray-100"
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      >
                        <AiOutlineMinus size={16} />
                      </button>
                      <span className="px-4 font-roboto">{item.quantity}</span>
                      <button
                        className="p-2 text-gray-500 hover:bg-gray-100"
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      >
                        <AiOutlinePlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline size={24} />
                </button>
              </div>
            ))}
        </div>

        {/* Cart Footer */}
        {cartItems.length >= 1 && (
          <div className="p-6 border-t mt-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-poppins text-lg font-semibold text-gray-800">
                Subtotal
              </h3>
              <h3 className="font-poppins text-xl font-bold text-gray-800">
                ${totalPrice}
              </h3>
            </div>
            <button
              onClick={handleCheckout}
              type="button"
              className="w-full bg-gray-800 text-white font-roboto font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
