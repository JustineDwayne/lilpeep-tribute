import Image from "next/image";
import peep from "public/lilpeep.png";
import o from "public/overlay.jpg";
import o1 from "public/overlay1.jpg";

export default function Landing() {
    return (
        <section className="relative min-h-screen bg-gradient-to-r from-rose-500 to-pink-900 overflow-hidden">

            <div className="absolute inset-0 z-15 opacity-100 mix-blend-lighten">
                <Image
                    src={o}
                    alt="Overlay 1"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Overlay 2 */}
            <div className="absolute inset-0 opacity-100 mix-blend-lighten">
                <Image
                    src={o1}
                    alt="Overlay 2"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Lil Peep (top left) */}
            <div className="absolute top-19 left-1 p-0 m-0 text-white text-4xl md:text-9xl font-extrabold font-sans space-y-0 leading-none">
                <h1 className="m-0 p-0">gustav</h1>
                <h1 className="m-0 p-0">elijah</h1>
                <h1 className="m-0 p-0">ahr</h1>
            </div>

            {/* Lil Peep (top right) */}
            <div className="absolute top-23 right-4 text-white text-right space-y-0 leading-none">
                <h1 className="text-4xl md:text-9xl font-extrabold font-sans">lil peep</h1>
                <h1 className="text-xl md:text-6xl mt-1 font-semibold">a tribute.</h1>
            </div>

            <div className="absolute bottom-0 left-1 p-0 m-0 text-white text-4xl md:text-7xl font-extrabold font-sans space-y-0 leading-none">
                <h1 className="m-0 p-0">a legend</h1>
            </div>

            <div className="absolute bottom-0 right-1 p-0 m-0 text-white text-4xl md:text-7xl font-extrabold font-sans space-y-0 leading-none">
                <h1 className="m-0 p-0">an inspiration</h1>
            </div>


            {/* Lil Peep image (bottom center) */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Image
                    src={peep}
                    alt="Lil Peep"
                    className="md:w-[24rem] md:h-[40rem] drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
                    priority
                />
            </div>

            {/* Optional: glitch overlay or noise */}
            <div className="absolute inset-0 pointer-events-none animate-pulse opacity-5" />
        </section>
    );
}
