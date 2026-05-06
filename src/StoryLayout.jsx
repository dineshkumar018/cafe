import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between text-[#d6b98c] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
    <div className="flex flex-col uppercase tracking-[0.2em] pointer-events-auto cursor-pointer">
      <span className="text-[#f5e6c8] font-bold text-lg leading-tight">AURORA</span>
      <span className="text-[0.65rem] opacity-70">COFFEE CO.</span>
    </div>
    
    <nav className="hidden md:flex items-center gap-10 text-[0.65rem] uppercase tracking-widest font-medium pointer-events-auto">
      <a href="#story" className="hover:text-[#f5e6c8] transition-colors">Our Story</a>
      <a href="#coffee" className="hover:text-[#f5e6c8] transition-colors">Coffee</a>
      <a href="#experience" className="hover:text-[#f5e6c8] transition-colors">Experience</a>
      <a href="#shop" className="hover:text-[#f5e6c8] transition-colors">Shop</a>
    </nav>
    
    <div className="pointer-events-auto">
      <Link to="/menu" className="bg-[#c6a15b] hover:bg-[#d8b97a] px-6 py-2.5 text-[0.65rem] uppercase tracking-widest transition-all text-[#110a06] font-bold inline-block shadow-lg shadow-[#c6a15b]/20">
        Order Now
      </Link>
    </div>
  </header>
);

const StoryRow = ({ num, title, subtitle, desc }) => {
  return (
    <div className="relative w-full flex-1 flex items-center border-b border-white/5 last:border-b-0 overflow-hidden group">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 md:px-24 py-4 md:py-6 flex hover:bg-white/5 transition-colors duration-500 h-full">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[#c6a15b] text-xs tracking-widest">{num}</span>
            <div className="w-6 h-[1px] bg-[#c6a15b]/30"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#f5e6c8] tracking-tighter mb-1 uppercase drop-shadow-lg">
            {title}
          </h2>
          <h3 className="text-base md:text-lg text-[#d6b98c] font-light tracking-wide mb-2">
            {subtitle}
          </h3>
          <p className="text-xs text-white/50 max-w-xs leading-relaxed font-light hidden sm:block">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function StoryLayout() {
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // 80px offset because of pt-20
    let y = e.clientY - rect.top - 80; 
    const maxY = rect.height - 80;
    if (y < 0) y = 0;
    if (y > maxY) y = maxY;
    setMouseY(y);
  };

  return (
    <>
      <Header />
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen bg-[#110a06] text-[#d6b98c] pt-20 overflow-hidden"
      >
        
        {/* Single Full-Height Background Image on the right side */}
        <div className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0 opacity-80">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/sequence/ezgif-frame-080.jpg)` }}
          />
          {/* Gradient fade to match the dark background on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#110a06] via-[#110a06]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110a06]/40 via-transparent to-[#110a06]/40" />
        </div>

        {/* Left vertical timeline line */}
        <div className="absolute left-6 md:left-12 top-20 bottom-0 w-[1px] bg-white/5 z-20">
          <motion.div 
            animate={{ y: mouseY }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute left-0 top-0 w-3 h-3 -translate-x-[5px] -translate-y-1/2 rounded-full border border-[#c6a15b] bg-[#110a06] flex items-center justify-center pointer-events-none"
          >
            <div className="w-1 h-1 bg-[#c6a15b] rounded-full"></div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col pb-4">
          <StoryRow 
            num="01" 
            title="Brewed" 
            subtitle="Crafted for every moment" 
            desc="From the finest beans to the perfect cup, every detail matters."
          />
          <StoryRow 
            num="02" 
            title="Precision Roast" 
            subtitle="Every bean perfected" 
            desc="Carefully roasted to bring out the deepest flavors."
          />
          <StoryRow 
            num="03" 
            title="Rich Layers" 
            subtitle="Depth in every sip" 
            desc="A beautiful harmony of crema and espresso."
          />
          <StoryRow 
            num="04" 
            title="Taste the Craft" 
            subtitle="Experience true coffee" 
            desc="The final masterpiece, poured to perfection."
          />
        </div>
      </section>
    </>
  );
}
