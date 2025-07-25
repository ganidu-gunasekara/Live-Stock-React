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
      <div className="relative w-[90vw] max-w-[1000px] aspect-square">
        <Player
          autoplay
          loop={false}
          src="/animations/Abstraction.json"
          className="w-full h-full"
        />

        <Image
          src="/Logo-transparent.png"
          alt="Live Stocks Logo"
          width={1000}
          height={1000}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain w-24 sm:w-28 md:w-36 lg:w-44 xl:w-52 h-auto"
          priority
        />

      </div>
    </div>
  );
}
