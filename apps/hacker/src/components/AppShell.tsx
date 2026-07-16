'use client';

import { usePathname } from 'next/navigation';

import DynamicBackground from '@/components/DynamicBackground';
import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/Sidebar';
import { useHacker } from '@/context/HackerContext';

const IS_UNDER_CONSTRUCTION = false;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile } = useHacker();
  const isSharePage = pathname.startsWith('/share');
  const isPublicPage =
    isSharePage ||
    pathname === '/schedule' ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/nfc/') ||
    (pathname === '/' && !profile);

  return (
    <>
      <DynamicBackground />
      <div className="flex flex-col md:flex-row min-h-screen">
        {!isPublicPage && (
          <header className="md:hidden w-full absolute top-0 left-0 right-0 z-10 bg-transparent">
            <MobileHeader />
          </header>
        )}
        {!IS_UNDER_CONSTRUCTION && !isPublicPage && (
          <aside className="w-72 hidden md:block shrink-0">
            <Sidebar />
          </aside>
        )}
        <main
          className={`flex-1 overflow-y-auto ${isPublicPage ? '' : 'pt-20 md:pt-0'}`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
