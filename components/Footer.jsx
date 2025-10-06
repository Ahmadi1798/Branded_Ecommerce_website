import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="bg-gray-200 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-black text-sm mb-3 md:mb-0">
            © 2024 Branded Store
          </p>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="#" className="text-black hover:text-white">
              <AiFillInstagram size={18} />
            </a>
            <a href="#" className="text-black hover:text-white">
              <AiOutlineTwitter size={18} />
            </a>
          </div>

          {/* Legal */}
          <div className="hidden md:flex space-x-4 text-sm text-black mt-3 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
