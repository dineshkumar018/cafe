import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroVideo from './HeroVideo';
import StoryLayout from './StoryLayout';
import MenuDashboard from './MenuDashboard';
import LocationCTA from './LocationCTA';

function LandingPage() {
  return (
    <div className="relative w-full bg-[#110a06] text-[#d6b98c] font-sans selection:bg-[#c6a15b] selection:text-[#1a0f0a]">
      <main className="relative w-full flex flex-col">
        <HeroVideo />
        <StoryLayout />
        <LocationCTA />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
