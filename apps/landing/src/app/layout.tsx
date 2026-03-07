import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { assets } from '../lib/assets';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Hack the 6ix 2026',
  description: 'Hack the 6ix 2026 - July 17-19, 2026 in Toronto. In-Person.',
  icons: {
    icon: assets.logo.src,
    apple: assets.logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} antialiased h-full`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
