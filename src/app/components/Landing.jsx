import Image from "next/image";
import peep from "public/lilpeep.png";
import o from "public/overlay.jpg";
import o1 from "public/overlay1.jpg";
import t from "public/texture.jpg";
import t1 from "public/texture1.jpg";

export default function Landing() {
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-rose-500 to-pink-900 overflow-hidden">

      {/* Overlay Images */}
      <div className="absolute inset-0 opacity-100 mix-blend-lighten">
        <Image src={o} alt="Overlay 1" fill className="object-cover" priority />
      </div>

      <div className="absolute inset-0 opacity-100 mix-blend-overlay">
        <Image src={t1} alt="Overlay 2" fill className="object-cover" priority />
      </div>

      <div className="absolute inset-0 opacity-75 mix-blend-lighten">
        <Image src={t} alt="Overlay 3" fill className="object-cover" priority />
      </div>

      <div className="absolute inset-0 opacity-100 mix-blend-lighten">
        <Image src={o1} alt="Overlay 4" fill className="object-cover" priority />
      </div>

      {/* Top Left Text */}
      <div className="absolute md:top-21 left-2 text-white text-3xl top-25 sm:text-4xl md:text-8xl font-extrabold font-sans space-y-0 leading-none">
        <h1 className="m-0 p-0">gustav</h1>
        <h1 className="m-0 p-0">elijah</h1>
        <h1 className="m-0 p-0">ahr</h1>
      </div>

      {/* Top Right Text */}
      <div className="absolute top-25 right-2 text-white text-right space-y-0 leading-none">
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-extrabold font-sans">lil peep</h1>
        <h1 className="text-base sm:text-xl md:text-4xl mt-1 font-semibold">a tribute.</h1>
      </div>

      {/* Bottom Left Text */}
      <div className="absolute bottom-4 left-2 text-white text-2xl sm:text-3xl md:text-6xl font-extrabold font-sans leading-none">
        <h1 className="m-0 p-0">a legend</h1>
      </div>

      {/* Bottom Right Text */}
      <div className="absolute bottom-4 right-2 text-white text-2xl sm:text-3xl md:text-6xl font-extrabold font-sans leading-none">
        <h1 className="m-0 p-0">an inspiration</h1>
      </div>

      {/* Center Image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[70%] sm:w-[50%] md:w-[24rem]">
        <Image
          src={peep}
          alt="Lil Peep"
          className="w-full h-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
          priority
        />
      </div>

      {/* Optional: glitch or noise overlay */}
      <div className="absolute inset-0 pointer-events-none animate-pulse opacity-5" />
    </section>
  );
}
