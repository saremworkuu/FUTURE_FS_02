
import React, { useState } from 'react';
import { Menu, X, SunMedium } from 'lucide-react';

interface HeaderProps {
  isScrolled: boolean;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, isLightMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLightMode
            ? 'bg-white/80 backdrop-blur-md py-4 shadow-xl'
            : 'bg-[#121011]/90 backdrop-blur-md py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - Simplified */}
        <a href="#home" className="flex flex-col items-center">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-pink-500 leading-none">
            yegna ቡና
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-widest font-semibold transition-colors ${
                isLightMode
                  ? isScrolled
                    ? 'text-stone-900 hover:text-pink-600'
                    : 'text-white hover:text-pink-200'
                  : 'text-stone-400 hover:text-pink-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            className={`p-2 transition-colors ${
              isLightMode ? 'text-amber-500 hover:text-amber-600' : 'text-stone-400 hover:text-pink-400'
            }`}
            aria-label="Toggle light mode"
            onClick={onToggleTheme}
          >
            <SunMedium size={20} />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className={`p-2 transition-colors ${
              isLightMode ? 'text-amber-500 hover:text-amber-600' : 'text-stone-400 hover:text-pink-400'
            }`}
            aria-label="Toggle light mode"
            onClick={onToggleTheme}
          >
            <SunMedium size={20} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-stone-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1c1819] border-t border-pink-900 shadow-2xl p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-serif text-stone-200 hover:text-pink-400"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
