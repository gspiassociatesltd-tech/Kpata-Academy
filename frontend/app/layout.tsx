import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kpata Academy – Free AI Education & Certifications',
  description: 'Learn AI for free, earn global certifications (Google, AWS, Meta, IBM), build your portfolio, and get discovered by employers.',
  openGraph: {
    title: 'Kpata Academy – Free AI Education & Certifications',
    description: 'Learn AI for free, earn global certifications (Google, AWS, Meta, IBM), build your portfolio, and get discovered by employers.',
    url: 'https://kpata-academy.vercel.app',
    siteName: 'Kpata Academy',
    images: [
      {
        url: 'https://placehold.co/1200x630/000000/FFFFFF?text=Kpata+Academy+AI+Education',
        width: 1200,
        height: 630,
        alt: 'Kpata Academy – Free AI Education',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kpata Academy – Free AI Education & Certifications',
    description: 'Learn AI for free, earn global certifications, build your portfolio, and get discovered by employers.',
    images: ['https://placehold.co/1200x630/000000/FFFFFF?text=Kpata+Academy+AI+Education'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
