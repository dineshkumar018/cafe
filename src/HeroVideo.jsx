import React from 'react';

export default function HeroVideo() {
  return (
    <div className="relative w-full h-screen bg-[#1a0f0a] overflow-hidden">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-[#110a06]"></div>
      
      {/* Auto-playing MP4 Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${import.meta.env.BASE_URL}hero-video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d6b98c] z-10 pointer-events-none bg-black/10">
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-[0.1em] text-[#f5e6c8] drop-shadow-2xl mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
          <span className="text-[#c6a15b]">Aurora</span> Blend
        </h1>
        <p className="text-lg md:text-2xl font-light tracking-widest text-[#d6b98c] drop-shadow-lg opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
          Masterpiece in every drop
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c6a15b] to-transparent"></div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#110a06] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
