"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 z-50 animate-fadeIn">
      <div className="relative w-[1000px] h-[1000px]"> {/* Big animation area */}
        
        <Player
          autoplay
          loop={false}
          src="/animations/Abstraction.json"
          className="w-full h-full"
        />

        {/* Centered overlay logo */}
        <Image
          src="/Logo-transparent.png"
          alt="Live Stocks Logo"
          width={500}
          height={500}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
    </div>
  );
}
