import Header from "../components/Header.jsx";
import Image from "next/image";
import t from "public/texture.jpg";
import t1 from "public/texture1.jpg";

export default function Merch() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-900" />
      </div>

      {/* Texture Overlays */}
      <div className="absolute inset-0 z-10 mix-blend-overlay opacity-100 pointer-events-none">
        <Image src={t1} alt="Overlay Texture 1" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 z-10 mix-blend-lighten opacity-75 pointer-events-none">
        <Image src={t} alt="Overlay Texture 2" fill className="object-cover" priority />
      </div>

      {/* Foreground content */}
      <div className="relative">
        <Header />
        <main className="p-10 text-white">
          <h1 className="text-4xl font-extrabold">Merch</h1>
          {/* Merch content goes here */}
        </main>
      </div>
    </div>
  );
}
