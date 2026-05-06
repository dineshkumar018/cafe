import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocationCTA() {
  return (
    <section className="relative w-full min-h-screen bg-[#0c0806] flex flex-col md:flex-row items-center border-t border-white/5 overflow-hidden">
      
      {/* Left Side: Location & Details */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12 md:pl-32 lg:pl-48 md:pr-12 py-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#f5e6c8] tracking-tighter mb-4 uppercase drop-shadow-lg">
          Visit Our <span className="text-[#c6a15b]">Cafe</span>
        </h2>
        <p className="text-[#d6b98c] font-light max-w-md mb-12 text-sm leading-relaxed">
          Experience the finest brews crafted with precision. Whether you're looking for a quick pick-me-up or a place to unwind, Aurora Cafe is your destination.
        </p>

        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-start gap-4">
            <MapPin className="text-[#c6a15b] shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-[#f5e6c8] font-bold tracking-wider uppercase text-sm mb-1">Location</h4>
              <p className="text-white/60 text-sm font-light">123 Coffee Street, Brew City<br/>CA 90210, USA</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Clock className="text-[#c6a15b] shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-[#f5e6c8] font-bold tracking-wider uppercase text-sm mb-1">Opening Hours</h4>
              <p className="text-white/60 text-sm font-light">Mon - Fri: 7:00 AM - 9:00 PM<br/>Sat - Sun: 8:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-[#c6a15b] shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-[#f5e6c8] font-bold tracking-wider uppercase text-sm mb-1">Contact</h4>
              <p className="text-white/60 text-sm font-light">+91 98765 43210<br/>hello@auroracoffee.com</p>
            </div>
          </div>
        </div>

        <div>
          <Link to="/menu" className="bg-[#c6a15b] hover:bg-[#d8b97a] px-10 py-4 text-xs uppercase tracking-[0.2em] transition-all text-[#110a06] font-bold inline-flex items-center gap-3 shadow-[0_0_20px_rgba(198,161,91,0.2)] hover:shadow-[0_0_30px_rgba(198,161,91,0.4)]">
            Order Now <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      {/* Right Side: Rotating Coffee Cup */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative flex items-center justify-center bg-gradient-to-l from-[#110a06] to-[#0c0806]" style={{ perspective: '1200px' }}>
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#c6a15b]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Floating & Shaky Container */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{ 
            y: [-15, 15, -15],
            rotateZ: [-2, 2, -2],
            rotateX: [-5, 5, -5],
            rotateY: [-5, 5, -5]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/splash-cup.png`}
            alt="Floating Coffee Cup"
            className="w-auto h-[80%] md:h-[110%] md:scale-110 lg:scale-125 object-contain drop-shadow-[0_20px_40px_rgba(198,161,91,0.4)]"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="text-center absolute" style={{ display: 'none' }}>
             <p className="text-[#c6a15b] text-sm font-bold uppercase tracking-widest mb-2">Image Not Found</p>
             <p className="text-white/50 text-xs">Please save your cup image as<br/>`public/images/splash-cup.png`</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
