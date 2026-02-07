
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
                src="https://i.pinimg.com/736x/20/68/61/2068617c7aeeef1ba391bc2f6efdb8ef.jpg" 
                alt="yegna ቡና store interior" 
                className="rounded-2xl shadow-2xl mt-8 grayscale-[5%]"
              />
            <img 
              src="https://i.pinimg.com/736x/fe/93/5f/fe935fb36752fe61f1c95cb3923798d1.jpg" 
              alt="yegna ቡና confectionery display" 
              className="rounded-2xl shadow-2xl grayscale-[5%]"
            />
          </div>
          {/* Floral accent */}
          <div className="absolute -top-10 -left-10 w-24 h-24 text-pink-900 opacity-30">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C 60 30, 90 40, 100 50 C 70 60, 60 90, 50 100 C 40 70, 10 60, 0 50 C 30 40, 40 10, 50 0" />
            </svg>
          </div>
        </div>

        <div className="order-1 md:order-2 space-y-8">
          <h2 className="text-pink-500 font-medium tracking-[0.2em] uppercase text-sm">Beyond the Cup</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-100 leading-tight">
            Crafting the perfect brew with soul and precision.
          </h3>
          <p className="text-stone-400 text-lg leading-relaxed">
	            At Yegna ቡና, coffee is more than a drink — it’s a tradition rooted in Ethiopia, the birthplace of coffee. We thoughtfully source our beans from small Ethiopian farms and roast them to honor their natural floral sweetness and gentle chocolate notes.
	          </p>
          <p className="text-stone-400 text-lg leading-relaxed">
	            Whether you’re starting your day with a rich espresso or slowing down with a hand-poured brew, our baristas care deeply about every step of the process. Enjoy your cup alongside our house-made sweets for a moment meant to be savored.
          </p>
          
          <div className="flex items-center space-x-8 pt-4">
            <div>
              <p className="text-3xl font-serif text-pink-400">Specialty</p>
              <p className="text-xs uppercase tracking-widest text-stone-500">Grade Coffee</p>
            </div>
            <div className="w-px h-10 bg-pink-900/50"></div>
            <div>
              <p className="text-3xl font-serif text-pink-400">Ethical</p>
              <p className="text-xs uppercase tracking-widest text-stone-500">Sourcing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
