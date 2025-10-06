import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product }) => {
  const firstImage = product.image && product.image[0];
  const imageUrl = firstImage ? urlFor(firstImage).url() : null;
  return (
    <div>
      <Link href={`/product/${product.slug?.current}`}>
        {imageUrl && (
          <div className="cursor-pointer transform hover:scale-110 duration-200 transition-al mt-5">
            <img
              className="rounded-2xl bg-[#ebebeb] "
              src={imageUrl}
              alt={product.name}
              height={250}
              width={250}
            />
            <p className="font-[500px]">{product.name}</p>
            <p
              className="mt-1.5
             text-black font-bold"
            >
              {product.price}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};
export default Product;
