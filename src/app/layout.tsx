import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Search from '@/components/Search';
import { siteConfig } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/blog" />
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={new URL(siteConfig.url).hostname}
          data-auto-track-outbound-links="true"
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Search />
        <Header />
        <main id="main-content" className="max-w-5xl mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
