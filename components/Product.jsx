import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product }) => {
  const firstImage = product.image && product.image[0];
  const imageUrl = firstImage ? urlFor(firstImage).url() : null;

  return (
    <Link href={`/product/${product.slug?.current}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        {imageUrl && (
          <img
            className="w-full h-64 object-cover"
            src={imageUrl}
            alt={product.name}
          />
        )}
        <div className="p-4 text-center">
          <h3 className="font-poppins text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="font-roboto text-base text-gray-600">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Product;
