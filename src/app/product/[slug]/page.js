'use client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../../../components';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor, client } from '../../../../lib/client';
import { useStateContext } from '../../../../context/StateContext';
import { use } from 'react';

const ProductDetails = ({ params }) => {
  const { slug } = use(params);
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { qty, increaseQty, decreaseQty, onAdd, setShowCart } =
    useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
        const productsQuery = `*[_type == "product"]`;

        const [productData, allProductsData] = await Promise.all([
          client.fetch(query),
          client.fetch(productsQuery),
        ]);

        setProduct(productData);
        setAllProducts(allProductsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const productImages = product.image || [];
  const relatedProducts = allProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 rounded-lg mb-4">
            {productImages[selectedImageIndex] && (
              <Image
                src={urlFor(productImages[selectedImageIndex]).url()}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index
                    ? 'border-gray-800'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="font-poppins text-4xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <span className="text-gray-600 ml-2">(4 Reviews)</span>
          </div>
          <p className="font-roboto text-gray-600 mb-6">{product.details}</p>
          <p className="font-poppins text-3xl font-bold text-gray-800 mb-6">
            ${product.price}
          </p>

          <div className="flex items-center mb-6">
            <h4 className="font-poppins font-semibold mr-4">Quantity:</h4>
            <div className="flex items-center border border-gray-200 rounded-md">
              <button
                className="p-3 text-gray-500 hover:bg-gray-100"
                onClick={decreaseQty}
              >
                <AiOutlineMinus size={18} />
              </button>
              <span className="px-6 font-roboto text-lg">{qty}</span>
              <button
                className="p-3 text-gray-500 hover:bg-gray-100"
                onClick={increaseQty}
              >
                <AiOutlinePlus size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onAdd(product, qty)}
              className="flex-1 bg-gray-800 text-white font-roboto font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-white text-gray-800 border-2 border-gray-800 font-roboto font-semibold py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="font-poppins text-3xl font-bold text-center text-gray-800 mb-12">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <Product key={relatedProduct._id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
