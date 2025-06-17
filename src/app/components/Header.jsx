'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';
import lp from 'public/logo.png';
import { Menu, X } from 'lucide-react'; // Optional: use Lucide icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { label: "Home", href: "/" },
    { label: "Merch", href: "/merch" },
    { label: "Discography", href: "/discography" },
  ];

  return (
    <header className={`${isHome ? "bg-gradient-to-r from-rose-500 to-pink-900 fixed top-0 w-full z-40 shadow-md" : "bg-gradient-to-r from-rose-500 to-pink-900 sticky top-0 w-full z-40 shadow-md"}`}>
      <div className="flex justify-between items-center py-2 px-6 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={lp}
            alt="Lil Peep Logo"
            className="w-40 md:w-49 md:h-18"
            onClick={() => href = "/"}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 md:text-2xl text-white text-lg font-semibold">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-pink-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden bg-pink-600 px-6 pb-4 gap-3 text-white text-lg font-semibold">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
