import React, { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const totalFrames = 192;

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    const loadImages = async () => {
      const promises = [];
      for (let i = 0; i < totalFrames; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          const frameNumber = String(i + 1).padStart(3, '0');
          img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
            loadedImages[i] = img;
            resolve();
          };
          img.onerror = () => {
            loadedImages[i] = img;
            resolve();
          };
        });
        promises.push(promise);
      }
      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let currentFrame = 0;
    let lastTime = performance.now();
    const fps = 30; // Auto-play speed
    const frameInterval = 1000 / fps;

    const render = (time) => {
      if (time - lastTime >= frameInterval) {
        currentFrame = (currentFrame + 1) % totalFrames;
        lastTime = time;

        const img = images[currentFrame];
        if (img && img.complete && img.naturalWidth !== 0) {
          const dpr = window.devicePixelRatio || 1;
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;

          ctx.fillStyle = '#1a0f0a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Object-fit: cover logic
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.drawImage(img, x, y, w, h);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const resizeHandler = () => {
      // Force an immediate re-render on resize
      const img = images[currentFrame];
      if (img && img.complete && img.naturalWidth !== 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        ctx.fillStyle = '#1a0f0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(img, x, y, w, h);
      }
    };
    
    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [isLoaded, images]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a0f0a]">
        
        {/* Custom Coffee Cup Loader */}
        <div className="relative w-12 h-12 mb-12">
          {/* Steam */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-80">
            <div className="w-[3px] h-4 bg-[#c6a15b] rounded-full animate-[bounce_1s_infinite_0ms]"></div>
            <div className="w-[3px] h-6 bg-[#c6a15b] rounded-full animate-[bounce_1s_infinite_200ms]"></div>
            <div className="w-[3px] h-5 bg-[#c6a15b] rounded-full animate-[bounce_1s_infinite_400ms]"></div>
          </div>

          {/* The Cup */}
          <div className="absolute inset-0 border-[3px] border-[#c6a15b] rounded-b-[1.25rem] rounded-t-sm overflow-hidden z-10 flex items-end bg-[#2b1a12]">
            {/* The Coffee Filling */}
            <div 
               className="w-full bg-[#c6a15b] transition-all duration-200 ease-out"
               style={{ height: `${loadProgress}%` }}
            />
          </div>

          {/* The Handle */}
          <div className="absolute -right-4 top-2 w-5 h-7 border-[3px] border-[#c6a15b] border-l-0 rounded-r-xl z-0"></div>
        </div>

        <div className="w-64 h-2 bg-[#2b1a12] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#c6a15b] transition-all duration-200 ease-out relative"
            style={{ width: `${loadProgress}%` }}
          >
            {/* Glossy shine on progress bar */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </div>
        <p className="mt-4 text-[#c6a15b] font-medium uppercase tracking-widest text-xs">
          Brewing... {loadProgress}%
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a0f0a]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" /> {/* Subtle darkening overlay */}
      
      {/* Scroll indicator overlay at bottom of hero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className="text-[#f5e6c8] text-xs uppercase tracking-widest mb-3 opacity-80 font-medium drop-shadow-md">Scroll to explore</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#c6a15b] animate-[scrolldown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
