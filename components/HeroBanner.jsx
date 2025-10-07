import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ herobanner }) => {
  if (!herobanner) return null;
  const imageUrl = herobanner.image ? urlFor(herobanner.image).url() : null;

  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <p className="font-roboto text-lg text-gray-600 mb-2">
              {herobanner.smallText}
            </p>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {herobanner.midText}
            </h1>
            <h2 className="font-poppins text-6xl md:text-7xl font-extrabold text-gray-900 uppercase mb-6">
              {herobanner.largeText1}
            </h2>
            <Link href={`/product/${herobanner.product}`}>
              <button
                type="button"
                className="font-roboto bg-gray-800 text-white py-3 px-8 rounded-lg text-lg hover:bg-gray-700 transition-colors"
              >
                {herobanner.buttonText}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="hero-banner-image"
                className="w-full max-w-md h-auto object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
