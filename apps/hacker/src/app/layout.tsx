/* eslint-disable simple-import-sort/imports */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import DynamicBackground from '@/components/DynamicBackground';
import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/Sidebar';
import { HackerProvider } from '@/context/HackerContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const metadata: Metadata = {
  title: 'Hacker Dashboard | Hack the 6ix',
  description: 'Hacker Dashboard',
};

const IS_UNDER_CONSTRUCTION = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <HackerProvider>
          <DynamicBackground />
          <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
            <header className="md:hidden w-full absolute top-0 left-0 right-0 z-10 bg-transparent">
              <MobileHeader />
            </header>
            {!IS_UNDER_CONSTRUCTION && (
              <aside className="w-72 hidden md:block shrink-0">
                <Sidebar />
              </aside>
            )}
            <main className="min-w-0 flex-1 overflow-y-auto pt-20 md:pt-0">
              {children}
            </main>
          </div>
        </HackerProvider>
      </body>
    </html>
  );
}
