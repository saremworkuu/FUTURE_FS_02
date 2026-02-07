
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Full Background Image - Enhanced Visibility */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://i.pinimg.com/1200x/77/6c/99/776c997bec9c037e8bf87ce129088a10.jpg" 
            alt="yegna ቡና" 
            className="w-full h-full object-cover"
          />
        {/* Subtle Dark Overlays only for text legibility */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Centered Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
            yegna ቡና
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-white/90 leading-relaxed mb-12 font-light drop-shadow-lg">
            Sharing meaningful coffee moments inspired by Ethiopia, the birthplace of coffee.
          </p>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <a 
            href="#menu" 
            className="px-10 py-4 border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 min-w-[220px] backdrop-blur-sm"
          >
            Explore Menu
          </a>
          <a 
            href="#contact" 
            className="text-white text-xs font-bold uppercase tracking-[0.2em] hover:text-pink-300 transition-colors drop-shadow-md"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Minimalist scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-70"></div>
      </div>
    </div>
  );
};

export default Hero;
