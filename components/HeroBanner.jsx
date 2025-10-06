import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ herobanner }) => {
  if (!herobanner) return null;
  const imageUrl = herobanner.image ? urlFor(herobanner.image).url() : null;
  return (
    <div className="relative w-full py-24 px-10 bg-[#dcdcdc] leading-3.5 rounded-2xl h-[500px] ">
      <div>
        <p className="font-[20px] text-black">{herobanner.smallText}</p>
        <h3 className="text-5xl md:text-6xl mt-2 text-black font-extrabold">
          {herobanner.midText}
        </h3>
        <h1 className="text-8xl md:text-9xl font-bold text-white uppercase mt-2.5">
          {herobanner.largeText1}
        </h1>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="hero-banner-image"
            className="absolute top-0 right-1/5 w-[450px] h-[450px]"
          />
        )}
        <div>
          <Link href={`/product/${herobanner.product}`}>
            <button
              type="button"
              className="rounded-2xl py-1 px-4 bg-[#f02d34] text-white border-none mt-5 cursor-pointer z-10  text-sm md:text-xl"
            >
              {herobanner.buttonText}
            </button>
          </Link>
          <div className="absolute flex flex-col text-black leading-1.5 right-20 bottom-10 w-[300px]">
            <h5 className="mb-4 font-[700px] text-[16px] self-end">
              DESCRIPTION
            </h5>
            <p className="text-[#5f5f5f] font-[100px] text-end">
              {herobanner.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
