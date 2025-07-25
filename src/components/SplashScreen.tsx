'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 z-50 animate-fadeIn">
      <div className="relative w-[95vw] max-w-[1000px] aspect-square">
        <Player
          autoplay
          loop={false}
          src="/animations/Abstraction.json"
          className="w-full h-full"
        />

        <Image
          src="/Logo-transparent.png"
          alt="Live Stocks Logo"
          width={500} 
          height={500}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain h-auto w-40 sm:w-32 md:w-40 lg:w-56 xl:w-64"
          priority
        />

      </div>
    </div>
  );
}
