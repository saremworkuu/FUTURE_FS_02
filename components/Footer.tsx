
import React from 'react';

interface FooterProps {
  isLightMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLightMode }) => {
  return (
    <footer
      className={`pt-20 pb-10 border-t ${
        isLightMode ? 'bg-white border-pink-100' : 'bg-[#121011] border-pink-900/10'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
          {/* Brand section removed as per user request */}

          <div>
            <h4
              className={`font-bold uppercase tracking-widest text-xs mb-6 ${
                isLightMode ? 'text-stone-900' : 'text-stone-100'
              }`}
            >
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className={`text-sm transition-colors ${
                    isLightMode ? 'text-stone-600 hover:text-pink-500' : 'text-stone-500 hover:text-pink-400'
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`text-sm transition-colors ${
                    isLightMode ? 'text-stone-600 hover:text-pink-500' : 'text-stone-500 hover:text-pink-400'
                  }`}
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className={`text-sm transition-colors ${
                    isLightMode ? 'text-stone-600 hover:text-pink-500' : 'text-stone-500 hover:text-pink-400'
                  }`}
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`text-sm transition-colors ${
                    isLightMode ? 'text-stone-600 hover:text-pink-500' : 'text-stone-500 hover:text-pink-400'
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold uppercase tracking-widest text-xs mb-6 ${
                isLightMode ? 'text-stone-900' : 'text-stone-100'
              }`}
            >
              Opening Hours
            </h4>
            <ul className="space-y-4">
              <li
                className={`text-sm flex justify-between ${
                  isLightMode ? 'text-stone-600' : 'text-stone-500'
                }`}
              >
                <span>Tue - Fri:</span>
                <span className={isLightMode ? 'text-stone-900 font-medium' : 'text-stone-200 font-medium'}>
                  10:00 - 19:00
                </span>
              </li>
              <li
                className={`text-sm flex justify-between ${
                  isLightMode ? 'text-stone-600' : 'text-stone-500'
                }`}
              >
                <span>Sat - Sun:</span>
                <span className={isLightMode ? 'text-stone-900 font-medium' : 'text-stone-200 font-medium'}>
                  09:00 - 18:00
                </span>
              </li>
              <li
                className={`text-sm flex justify-between ${
                  isLightMode ? 'text-stone-600' : 'text-stone-500'
                }`}
              >
                <span>Monday:</span>
                <span className="text-pink-900 font-medium italic">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`pt-10 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs tracking-wider ${
            isLightMode ? 'border-pink-100 text-stone-500' : 'border-pink-900/10 text-stone-600'
          }`}
        >
	          <p>© 2024 yegna ቡና. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
