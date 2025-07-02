// lib/deezer.js

export const searchArtist = async (artistName) => {
  try {
    const response = await fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}&limit=1`
    );
    const data = await response.json();
    
    if (!response.ok || !data.data.length) {
      console.error('Deezer artist search failed:', data);
      return null;
    }
    
    return data.data[0];
  } catch (error) {
    console.error('Error searching artist:', error);
    return null;
  }
};

export const getArtistAlbums = async (artistId) => {
  try {
    const response = await fetch(
      `https://api.deezer.com/artist/${artistId}/albums?limit=50`
    );
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Deezer albums fetch failed:', data);
      return [];
    }
    
    // Remove duplicates by title
    const uniqueAlbums = [];
    const titles = new Set();
    
    for (const album of data.data) {
      if (!titles.has(album.title)) {
        titles.add(album.title);
        uniqueAlbums.push({
          id: album.id,
          name: album.title,
          images: [{ url: album.cover_xl || album.cover_big || album.cover_medium }],
          release_date: album.release_date,
          type: album.record_type
        });
      }
    }
    
    return uniqueAlbums;
  } catch (error) {
    console.error('Error fetching artist albums:', error);
    return [];
  }
};

export const getAlbumTracks = async (albumId) => {
  try {
    const response = await fetch(`https://api.deezer.com/album/${albumId}/tracks`);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Deezer tracks fetch failed:', data);
      return [];
    }
    
    return data.data.map(track => ({
      id: track.id,
      name: track.title,
      preview_url: track.preview, // Deezer usually has previews!
      duration_ms: track.duration * 1000, // Deezer gives seconds, convert to ms
      is_playable: true, // Deezer previews are generally available
      spotify_url: null, // We don't have Spotify links from Deezer
      deezer_url: track.link,
      albumImage: track.album?.cover_medium || null
    }));
  } catch (error) {
    console.error('Error fetching album tracks:', error);
    return [];
  }
};