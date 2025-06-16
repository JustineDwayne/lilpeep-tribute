import Image from "next/image"
import t from "public/texture.jpg"
import t1 from "public/texture1.jpg"
import lp from "public/lilpeep.png"

export default function ContentOne() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-r from-rose-500 to-pink-900 isolate">
            {/* Background Textures */}
            <div className="absolute inset-0 mix-blend-overlay opacity-100 -z-10">
                <Image src={t1} alt="Overlay Texture 1" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 mix-blend-lighten opacity-75 -z-10">
                <Image src={t} alt="Overlay Texture 2" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 mix-blend-lighten opacity-100 -z-10">
                <Image src={lp} alt="Lil Peep Portrait" fill className="object-cover" priority />
            </div>

            {/* Content Layer */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen">
                <div className="hidden md:block"></div> {/* Image sits behind anyway */}

                <div className="flex flex-col justify-center items-end px-8 py-24 text-right bg-black/80 text-white">
                    <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter uppercase">
                        A legacy<br />
                        <span className="text-pink-400">A legend</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-pink-200 font-mono border-t border-white pt-4">
                        Lil Peep was not a phase. He was a feeling.<br />
                        A soft scream in a loud world — unfiltered, beautiful, doomed.<br />
                        This is a digital altar. Sit with it.<br />
                        This Isn't Nostalgia — It's a reckoning <br />
                        He Didn't Fade — He Burned; And we’re still glowing in it.
                    </p>
                </div>
            </div>
        </section>
    )
}
