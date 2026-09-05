import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kpata Academy – Learn AI. Build AI. Get Discovered.',
  description: 'Free AI education for everyone in English, Hausa, Yorùbá, Igbo, and Pidgin. Learn AI, earn certifications, and build your portfolio.',
  keywords: 'AI education, free AI courses, Nigeria, multilingual, Google AI, AWS AI, Meta AI, IBM AI',
  openGraph: {
    title: 'Kpata Academy – Learn AI. Build AI. Get Discovered.',
    description: 'Free AI education for everyone in English, Hausa, Yorùbá, Igbo, and Pidgin.',
    url: 'https://kpata-academy.vercel.app',
    siteName: 'Kpata Academy',
    images: [
      {
        url: 'https://kpata-academy.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kpata Academy – AI education for Africa',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kpata Academy – Learn AI. Build AI. Get Discovered.',
    description: 'Free AI education for everyone in English, Hausa, Yorùbá, Igbo, and Pidgin.',
    images: ['https://kpata-academy.vercel.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://kpata-academy.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
