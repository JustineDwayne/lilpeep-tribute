'use client';
import Header from "../components/Header";
import Image from "next/image";
import t from "public/texture.jpg";
import t1 from "public/texture1.jpg";

export default function DiscographyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-900" />
      </div>

      <div className="absolute inset-0 z-10 mix-blend-lighten opacity-75 pointer-events-none">
        <Image src={t} alt="Overlay Texture 2" fill className="object-cover" priority />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20">
        <Header />
        <main className="p-10 text-white">
          <h4 className="text-4xl font-extrabold">Discography</h4>
          {/* Your discography content here */}
        </main>
      </div>
    </div>
  );
}
