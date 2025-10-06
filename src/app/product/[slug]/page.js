'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { client, urlFor } from '../../../../lib/client';
import {
  FaTruck,
  FaUndo,
  FaCheckCircle,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { useStateContext } from '../../../../context/StateContext';

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images Gallery - Left Side */}
        <div>
          {/* Main Image */}
          <div className="mb-4 rounded-lg overflow-hidden bg-[#ebebeb] aspect-square">
            {productImages[selectedImageIndex] && (
              <Image
                src={urlFor(productImages[selectedImageIndex]).url()}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            )}
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden aspect-square transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-red-500 ring-2 ring-red-200'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <Image
                    src={urlFor(img).url()}
                    alt={`${product.name} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details - Right Side */}
        <div className="space-y-6">
          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">{'⭐'.repeat(5)}</div>
            <span className="text-gray-500">(20)</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Details:</h3>
            <p className="text-gray-700">{product.details}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-red-600">
              ${product.price}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <h4 className="font-semibold">Quantity:</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={decreaseQty}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <FaMinus size={12} />
              </button>
              <span className="text-lg font-semibold w-8 text-center">
                {qty}
              </span>
              <button
                onClick={increaseQty}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                onAdd(product, qty);
              }}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaPlus size={16} />
              Add to Cart
            </button>
            <button
              className="flex-1 bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            {/* Free Delivery */}
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                <FaTruck size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-600">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            {/* Return Delivery */}
            <div className="flex items-start gap-3">
              <div className="text-blue-600 mt-1">
                <FaUndo size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-sm text-gray-600">
                  Free 30-day returns. No questions asked.
                </p>
              </div>
            </div>

            {/* In Stock */}
            <div className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                <FaCheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-semibold">In Stock</h4>
                <p className="text-sm text-gray-600">
                  Ready to ship within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          You may also like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => {
            const relatedImage =
              relatedProduct.image && relatedProduct.image[0];
            const relatedImageUrl = relatedImage
              ? urlFor(relatedImage).url()
              : null;

            return (
              <Link
                key={relatedProduct._id}
                href={`/product/${relatedProduct.slug.current}`}
                className="group"
              >
                <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  {relatedImageUrl && (
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={relatedImageUrl}
                        alt={relatedProduct.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-red-600 font-bold">
                    ${relatedProduct.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
