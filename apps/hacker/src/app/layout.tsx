/* eslint-disable simple-import-sort/imports */

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import './globals.css';

import AppShell from '@/components/AppShell';
import { DiscordProvider } from '@/context/DiscordContext';
import { HackerProvider } from '@/context/HackerContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const metadata: Metadata = {
  title: 'Hacker Dashboard | Hack the 6ix',
  description: 'Hacker Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <HackerProvider>
          <Suspense fallback={null}>
            <DiscordProvider>
              <AppShell>{children}</AppShell>
            </DiscordProvider>
          </Suspense>
        </HackerProvider>
      </body>
    </html>
  );
}
