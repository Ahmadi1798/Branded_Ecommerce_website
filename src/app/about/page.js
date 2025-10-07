import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="font-poppins text-5xl font-bold text-gray-800 mb-6">
              The Story of Aura
            </h1>
            <p className="font-roboto text-lg text-gray-600 mb-6">
              Aura was born from a simple, yet powerful idea: to create a
              curated space for beautifully designed, high-quality products that
              bring joy and style to everyday life.
            </p>
            <p className="font-roboto text-lg text-gray-600 mb-6">
              Our mission is to elevate the ordinary through exceptional
              craftsmanship and timeless design. We partner with passionate
              artisans and suppliers who share our commitment to quality and
              sustainability.
            </p>
            <p className="font-roboto text-lg text-gray-600">
              Welcome to Aura. We&#39;re glad you&#39;re here.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-full h-96 bg-gray-200 rounded-lg">
              <Image
                src="/images/image.jpg" // Replace with your image path
                alt="About Aura"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Placeholder for a beautiful brand image */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
