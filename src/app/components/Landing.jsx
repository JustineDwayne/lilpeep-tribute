import Image from "next/image";
import peep from "public/lilpeep.png";

export default function Landing() {
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-rose-500 to-pink-900 overflow-hidden">
              {/* Lil Peep (top right) */}
      <h1 className="absolute top-30 right-10  text-white text-4xl md:text-6xl font-extrabold font-sans">
        lil peep
      </h1>

      {/* A Tribute (bottom left) */}
      <p className="absolute bottom-10 left-10 text-white text-lg md:text-2xl tracking-widest font-mono">
        A Tribute
      </p>

      {/* Lil Peep image (bottom center) */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <Image
          src={peep}
          alt="Lil Peep"
          className="w-48 md:w-[40rem] md:h-[40rem] drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
          priority
        />
      </div>

      {/* Optional: glitch overlay or noise */}
      <div className="absolute inset-0 pointer-events-none animate-pulse opacity-5" />
    </section>
  );
}
