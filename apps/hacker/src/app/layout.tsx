import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import Sidebar from '@/components/Sidebar';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const metadata: Metadata = {
  title: 'Hacker Dashboard | Hack the 6ix',
  description: 'Hacker Dashboard',
};

const IS_UNDER_CONSTRUCTION = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="fixed inset-0 -z-10 h-full w-full">
          <Image
            src="/pre-acceptance.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-h-screen">
          {!IS_UNDER_CONSTRUCTION && (
            <aside className="w-72 hidden md:block shrink-0">
              <Sidebar />
            </aside>
          )}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
