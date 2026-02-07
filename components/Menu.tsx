
import React from 'react';

interface MenuProps {
  isLightMode: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Artisan Cappuccino",
    price: "$ 4.75",
    description: "Perfectly balanced double shot with velvety micro-foam and a dusting of cocoa.",
    image: "https://i.pinimg.com/736x/93/88/a4/9388a4ef79506774d175273a21cd5f20.jpg",
    category: "Coffee"
  },
  {
    id: 2,
    name: "Lavender Honey Latte",
    price: "$ 5.50",
    description: "Smooth espresso infused with organic lavender and local wildflower honey.",
    image: "https://i.pinimg.com/736x/44/0c/90/440c90f0128e86448c665aba221eeadf.jpg",
    category: "Specialties"
  },
  {
    id: 3,
    name: "Royal Rosé Macaron",
    price: "$ 3.50",
    description: "Delicate macaron with raspberry ganache and a hint of rose essence.",
    image: "https://i.pinimg.com/736x/5e/17/dc/5e17dcb50f23af0b78c02596b60146c1.jpg",
    category: "Sweets"
  },
  {
    id: 4,
    name: "Cold Brew Tonic",
    price: "$ 5.00",
    description: "12-hour steep cold brew served with premium tonic and a twist of grapefruit.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400",
    category: "Iced"
  }
];

const Menu: React.FC<MenuProps> = ({ isLightMode }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-pink-500 font-medium tracking-[0.2em] uppercase text-sm mb-4">Curated Selection</h2>
        <h3
          className={`text-4xl font-serif mb-6 ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}
        >
          Coffee & Confections
        </h3>
        <p className={isLightMode ? 'text-stone-600' : 'text-stone-400'}>
          Discover the ultimate pairing of world-class roasts and artisanal desserts crafted in-house daily.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`group rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border hover:border-pink-500/30 ${
              isLightMode
                ? 'bg-white border-pink-100'
                : 'bg-[#1c1819] border-pink-900/10'
            }`}
          >
            <div className="relative h-64 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
            />
              <div className="absolute top-4 left-4">
                <span
                  className={`backdrop-blur-sm text-pink-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${
                    isLightMode ? 'bg-white/80' : 'bg-[#121011]/90'
                  }`}
                >
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h4
                  className={`text-xl font-serif leading-tight group-hover:text-pink-400 transition-colors ${
                    isLightMode ? 'text-stone-900' : 'text-stone-100'
                  }`}
                >
                  {item.name}
                </h4>
                <span className="text-pink-500 font-semibold">{item.price}</span>
              </div>
              <p
                  className={`text-sm leading-relaxed ${
                    isLightMode ? 'text-stone-600' : 'text-stone-500'
                  }`}
                >
                {item.description}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
