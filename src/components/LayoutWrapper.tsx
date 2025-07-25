'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSplashPage = pathname === '/';

  return (
    <>
      {!isSplashPage && <Header />}
      {children}
    </>
  );
}
