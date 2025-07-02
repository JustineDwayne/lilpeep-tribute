'use client';
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import t from "public/texture.jpg";

export default function DiscographyPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalTracks, setModalTracks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const artist = "lil peep";

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/deezer/discography?artist=${encodeURIComponent(artist)}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    }
    fetchAlbums();
  }, [artist]);

  const handleAlbumClick = async (album) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);

    try {
      const response = await fetch(
        `/api/deezer/discography?artist=${encodeURIComponent(artist)}&withTracks=true`
      );
      const data = await response.json();

      // Look for the album that was clicked
      const fullAlbum = Array.isArray(data)
        ? data.find((item) => item.id === album.id)
        : null;

      const tracks = fullAlbum?.tracks || [];
      setModalTracks(tracks);

    } catch (error) {
      console.error("Error fetching tracks:", error);
      setModalTracks([]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTracks([]);
    setSelectedAlbum(null);
  };

  // Helper function to format duration
  const formatDuration = (durationMs) => {
    if (!durationMs) return "0:00";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-rose-500 to-pink-900" />
      </div>
      <div className="absolute inset-0 z-10 mix-blend-lighten opacity-75 pointer-events-none">
        <Image src={t} alt="Overlay Texture 2" fill className="object-cover" priority />
      </div>

      {/* Foreground */}
      <div className={`relative z-20 transition duration-300 ${isModalOpen ? 'pointer-events-none brightness-100' : ''}`}>
        <Header />
        <main className="p-10 text-white">
          <h4 className="text-4xl font-extrabold mb-8">Discography</h4>
          {albums.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-50 w-50 border-b-4 border-white" />
            </div>
          ) : (
            <>
              {Array.isArray(albums) ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {albums.map((album) => (
                    <div
                      key={album.id}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleAlbumClick(album)}
                    >
                      <img
                        src={album.images?.[0]?.url}
                        alt={album.name}
                        className="rounded-xl w-full"
                      />
                      <h5 className="mt-2 font-semibold text-lg">{album.name}</h5>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-300">Failed to load albums: {albums?.error || 'Unknown error'}</p>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAlbum && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white/10 border border-white/20 text-white backdrop-blur-2xl shadow-xl p-6 rounded-2xl w-full max-w-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-white text-xl hover:text-red-400 transition"
            >
              ✕
            </button>

            {/* Album Title */}
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold">{selectedAlbum.name}</h3>
            </div>

            {/* Track List */}
            {modalTracks.length === 0 ? (
              <p className="text-gray-300 text-center">Loading tracks...</p>
            ) : (
              <ul className="space-y-4 max-h-[500px] overflow-y-auto px-2">
                {modalTracks.map((track, index) => (
                  <li
                    key={`${track.id}-${index}`}
                    className="flex gap-4 items-center bg-white/10 rounded-lg p-3 backdrop-blur-md hover:bg-white/20 transition"
                  >
                    {/* Track Info + Audio */}
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold truncate">{track.name}</span>
                        <span className="text-sm text-gray-300">
                          {formatDuration(track.duration_ms || track.duration * 1000)}
                        </span>
                      </div>

                      <div className="mt-2">
                        {track.preview_url ? (
                          <audio
                            controls
                            className="w-full appearance-none [&::-webkit-media-controls-panel]:bg-white/20 [&::-webkit-media-controls-play-button]:text-black rounded-md"
                          >
                            <source src={track.preview_url} type="audio/mpeg" />
                            Your browser does not support the audio tag.
                          </audio>
                        ) : (
                          <div className="text-sm text-gray-400 italic flex justify-between items-center">
                            No preview available
                            {track.deezer_url && (
                              <a
                                href={track.deezer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 bg-pink-600 px-3 py-1 rounded-full text-white text-xs hover:bg-pink-700 transition"
                              >
                                ▶ Play on Deezer
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

    </div>
  );
}