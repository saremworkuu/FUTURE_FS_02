
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsLightMode((prev) => !prev);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isLightMode ? 'bg-[#f7f2ec] text-stone-900' : 'bg-[#121011] text-stone-100'
    }`}>
      <Header isScrolled={isScrolled} isLightMode={isLightMode} onToggleTheme={toggleTheme} />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section
          id="about"
          className={`py-20 md:py-32 transition-colors duration-500 ${
            isLightMode ? 'bg-[#f3e2e7]' : 'bg-[#1c1819]'
          }`}
        >
          <About />
        </section>
        <section
          id="menu"
          className={`py-20 md:py-32 transition-colors duration-500 ${
            isLightMode ? 'bg-[#f7f2ec]' : 'bg-[#121011]'
          }`}
        >
          <Menu isLightMode={isLightMode} />
        </section>
        <section
          id="contact"
          className={`py-20 md:py-32 transition-colors duration-500 ${
            isLightMode ? 'bg-[#f3e2e7]' : 'bg-[#1c1819]'
          }`}
        >
          <Contact isLightMode={isLightMode} />
        </section>
      </main>
      <Footer isLightMode={isLightMode} />
    </div>
  );
};

export default App;
