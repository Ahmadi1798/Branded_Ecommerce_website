import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner }) => {
  if (!footerBanner) {
    return (
      <div className="h-[400px] bg-gray-200 mt-32 rounded-2xl">Loading...</div>
    );
  }

  const getImageUrl = () => {
    if (!footerBanner.image) return null;
    const imageData = Array.isArray(footerBanner.image)
      ? footerBanner.image[0]
      : footerBanner.image;
    return imageData ? urlFor(imageData).url() : null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-gray-800 text-white rounded-lg mt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <p className="font-roboto text-lg text-gray-400 mb-2">
              {footerBanner.discount}
            </p>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold mb-4">
              {footerBanner.largeText1} {footerBanner.largeText2}
            </h2>
            <p className="font-roboto text-lg text-gray-400 mb-6">
              {footerBanner.saleTime}
            </p>
            <Link href={`/product/${footerBanner.product}`}>
              <button
                type="button"
                className="font-roboto bg-white text-gray-800 py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors"
              >
                {footerBanner.buttonText}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="footer-banner-image"
                className="w-full max-w-md h-auto object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
