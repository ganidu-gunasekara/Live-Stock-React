// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 10000); 
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SplashScreen/>
  );
}
