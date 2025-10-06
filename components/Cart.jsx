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
      className="fixed right-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      onClick={() => setShowCart(false)}
    >
      <div
        ref={cartRef}
        className="absolute right-0 top-0 w-full md:w-[600px] h-full bg-white p-6 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <button
            type="button"
            className="text-gray-500 hover:text-red-500 transition-colors"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">
            Your Cart{' '}
            <span className="text-red-500">({totalQuantities} items)</span>
          </h2>
        </div>

        {/* Empty Cart */}
        {cartItems.length < 1 && (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <AiOutlineShopping size={150} className="text-gray-300" />
            <h3 className="text-xl font-semibold mt-4">
              Your shopping bag is empty
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="mt-6 bg-red-500 text-white font-semibold py-3 px-10 rounded-lg hover:bg-red-600 transition-colors"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto -mx-6 px-6">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="flex items-center gap-4 py-4 border-b"
                key={item._id}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(item?.image[0])}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold text-lg">{item.name}</h5>
                    <h4 className="font-bold text-lg text-red-500">
                      ${item.price}
                    </h4>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        className="p-2 text-red-500"
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="px-4 border-l border-r">
                        {item.quantity}
                      </span>
                      <button
                        className="p-2 text-green-500"
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline size={24} />
                </button>
              </div>
            ))}
        </div>

        {/* Cart Footer */}
        {cartItems.length >= 1 && (
          <div className="border-t pt-6 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Subtotal:</h3>
              <h3 className="text-xl font-bold text-red-500">${totalPrice}</h3>
            </div>
            <button
              onClick={handleCheckout}
              type="button"
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Pay with Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
