import Image from 'next/image'
import Link from 'next/link'
import lp from 'public/logo.png'

export default function Header() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Merch", href: "/merch" },
    { label: "Discography", href: "/discography" },
  ];

  return (
    <section className="flex justify-between items-center bg-pink-400 py-4 px-8 sticky top-0 z-40">
      <div>
        <Image src={lp} alt="Lil Peep Logo" className="w-32 h-auto" />
      </div>

      <nav className="flex gap-6 text-xl font-semibold  ">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="text-white hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
