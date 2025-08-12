import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ratan Portfolio',
  description: 'Portfolio site built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main className="max-w-5xl mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
