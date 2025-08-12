'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto p-4 flex flex-wrap items-center justify-between">
        <Link href="/" className="text-xl font-bold">Ratan</Link>
        <button
          className="md:hidden p-2 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <nav className={`${open ? 'block' : 'hidden'} w-full md:w-auto md:flex gap-4 items-center mt-4 md:mt-0`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block">
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
