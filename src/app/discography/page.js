'use client';
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import t from "public/texture.jpg";

export default function DiscographyPage() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const artist = "lil peep";

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/spotify/discography?artist=${encodeURIComponent(artist)}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    }
    fetchAlbums();
  }, [artist]);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch(`/api/spotify/discography?artist=${encodeURIComponent(artist)}&withTracks=true`);
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }
    fetchTracks();
  }, [artist]);

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
          {albums.length === 0 ? (
            <p>Loading...</p>
          ) : (
            albums.map((album) => (
              <div key={album.id} className="mb-8">
                <h5 className="text-2xl font-bold">{album.name}</h5>
                {album.images?.[0] && (
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="mt-2 rounded-xl w-[200px]"
                  />
                )}
                <ul className="list-disc ml-5 mt-2">
                  {album.tracks?.map((track) => (
                    <li key={track.id}>{track.name}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
