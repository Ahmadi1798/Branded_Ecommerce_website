import Link from 'next/link';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 pt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-2">
              Aura
            </h3>
            <p className="font-roboto text-base">
              Your destination for premium, stylish products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h4 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h4>
            <ul className="font-roboto space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gray-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-800">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-poppins text-lg font-semibold text-gray-800 mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Facebook"
              >
                <AiFillFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Twitter"
              >
                <AiOutlineTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Instagram"
              >
                <AiFillInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 mt-8 py-6">
          <p className="font-roboto text-sm">
            &copy; {new Date().getFullYear()} Aura. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
