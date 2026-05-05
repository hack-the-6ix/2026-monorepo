import { PropsWithChildren } from 'react';
import cn from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-default',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hackthe6ix.com'),
  title: 'Hack the 6ix 2026',
  description:
    "Hack the 6ix is Toronto's largest summer hackathon, where anyone can hack to learn, create, collaborate, innovate, and network.",
  openGraph: {
    title: 'Hack the 6ix 2026',
    description:
      "Hack the 6ix is Toronto's largest summer hackathon, where anyone can hack to learn, create, collaborate, innovate, and network.",
    url: '/',
    siteName: 'Hack the 6ix',
    type: 'website',
    images: {
        url: '/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'Hack the 6ix 2026',
      }
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn(`${inter.variable} antialiased`)}>{children}</body>
    </html>
  );
}
