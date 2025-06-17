import Image from "next/image";
import t from "public/texture.jpg";
import t1 from "public/texture1.jpg";
import peep from "public/rip.png";

export default function Rip() {
    return (
        <section className="relative min-h-screen overflow-hidden shadow-xl">
            {/* Background Gradient as base */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-900" />
            </div>

            {/* Overlay Textures ON TOP of the gradient */}
            <div className="absolute inset-0 z-10 mix-blend-overlay opacity-100">
                <Image src={t1} alt="Overlay Texture 1" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 z-10 mix-blend-lighten opacity-75">
                <Image src={t} alt="Overlay Texture 2" fill className="object-cover" priority />
            </div>

            {/* Foreground content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-white px-4 py-24 space-y-6">
                <Image
                    src={peep}
                    alt="Lil Peep Portrait"
                    width={300}
                    height={300}
                    className="rounded-lg border-4 border-pink-600 shadow-lg"
                    priority
                />
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-center">
                    Rest In Power
                </h1>
                <p className="text-4xl md:text-6xl font-bold max-w-xl text-center font-mono">
                    Lil Peep
                </p>
                <p className="text-lg md:text-2xl font-bold max-w-xl text-center font-mono">
                    November 1, 1996 - November 15, 2017
                </p>
            </div>
        </section>
    );
}

