
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { LenisScroller } from '@/components/lenis-scroller';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: {
    default: 'Top Fertilizer Company in India | Crop Life Care Fertilizers',
    template: `%s | Crop Life Care Fertilizers`,
  },
  description: 'Crop Life Care Fertilizers is a leading manufacturer and supplier of high-quality organic fertilizers, insecticides, and agricultural solutions in India. Boost your crop yield with our trusted and sustainable products.',
  keywords: [
    'fertilizer company in India', 
    'organic fertilizers', 
    'agricultural solutions', 
    'crop protection', 
    'fungicides India', 
    'insecticides India', 
    'plant growth regulators', 
    'bio-fertilizers',
    'best fertilizer for crops in India'
  ],
  openGraph: {
    title: 'Top Fertilizer Company in India | Crop Life Care Fertilizers',
    description: 'High-quality organic fertilizers, insecticides, and plant growth regulators to boost your crop yield in India.',
    url: '/',
    siteName: 'Crop Life Care Fertilizers',
    images: [
      {
        url: '/og-image.png', // It's good practice to have a specific Open Graph image
        width: 1200,
        height: 630,
        alt: 'Crop Life Care Fertilizers Products',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Fertilizer Company in India | Crop Life Care Fertilizers',
    description: 'Sustainable and effective agricultural solutions for Indian farmers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crop Life Care Fertilizers',
    url: process.env.NEXT_PUBLIC_URL,
    logo: `${process.env.NEXT_PUBLIC_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8979004454',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Khasra No. 813, Village Sisana Banger',
      addressLocality: 'Sisana, Baghpat',
      postalCode: '250609',
      addressRegion: 'UP',
      addressCountry: 'IN'
    },
    sameAs: [
      // Add links to your social media profiles here
      // "https://www.facebook.com/your-profile",
      // "https://www.twitter.com/your-profile",
      // "https://www.instagram.com/your-profile"
    ],
  };
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LenisScroller>
          <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
          </div>
          <Toaster />
        </LenisScroller>
      </body>
    </html>
  );
}
