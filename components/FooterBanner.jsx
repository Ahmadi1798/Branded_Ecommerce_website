import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image component for better performance
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner }) => {
  // Check if footerBanner exists and has image data
  if (!footerBanner) {
    return (
      <div className="h-[400px] bg-gray-200 mt-32 rounded-2xl">Loading...</div>
    );
  }

  // Safely extract image URL
  const getImageUrl = () => {
    if (!footerBanner.image) return null;

    // Handle both array and single image formats
    const imageData = Array.isArray(footerBanner.image)
      ? footerBanner.image[0]
      : footerBanner.image;

    return imageData ? urlFor(imageData).url() : null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="relative rounded-2xl h-[400px] text-white mt-32 w-full leading-5 px-8 md:px-28 py-10 bg-[#f02d34] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between h-full">
        <div className="mb-6 md:mb-0">
          <p className="mb-4 text-lg">{footerBanner.discount}</p>
          <h3 className="font-black text-4xl md:text-7xl">
            {footerBanner.largeText1}
          </h3>
          <h3 className="font-black text-4xl md:text-7xl">
            {footerBanner.largeText2}
          </h3>
          <p className="mt-4 text-lg">{footerBanner.saleTime}</p>
        </div>

        <div className="relative z-10">
          <p className="text-lg">{footerBanner.smallText}</p>
          <h3 className="font-black text-4xl md:text-7xl">
            {footerBanner.midText}
          </h3>
          <p className="mt-4 text-lg">{footerBanner.desc}</p>

          <Link href={`/product/${footerBanner.product}`}>
            <button
              type="button"
              className="rounded-2xl py-2.5 px-6 bg-white text-red-500 border-none mt-6 text-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {footerBanner.buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* Image with better positioning */}
      {imageUrl && (
        <div className="absolute bottom-0 right-0 md:left-1/4 transform -translate-y-1/4 w-48 h-48 md:w-64 md:h-64">
          <img
            src={imageUrl}
            height={300}
            width={300}
            alt={footerBanner.midText || 'Footer banner'}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default FooterBanner;
