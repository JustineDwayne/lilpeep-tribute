'use client';
import { useEffect, useState } from 'react';
import Header from "../components/Header.jsx";
import Image from "next/image";
import t from "public/texture.jpg";
import t1 from "public/texture1.jpg";

export default function Merch() {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/merch')
      .then(res => res.json())
      .then((data) => setMerch(data))
      .catch((error) => console.error('Error fetching merch data:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
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

      {/* Foreground Content */}
      <div className="relative z-20">
        <Header />
        <main className="p-10 text-white">
          <h1 className="text-4xl font-extrabold mb-6">Merch</h1>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-50 w-50 border-b-4 border-white" />
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {merch.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-lg shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-widest">{item.name}</h2>
                  <span className="text-xs mt-2 inline-block px-2 py-1 bg-white text-black rounded font-bold uppercase mb-1">
                    {item.type}
                  </span>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
