// lib/spotify.js

export const getSpotifyToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT;
  const client_secret = process.env.SPOTIFY_SECRET;

  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  };

  const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const data = await response.json();

  if (!response.ok) {
    console.error('Token Fetch Error:', data);
    throw new Error(data.error_description || 'Failed to fetch token');
  }

  return data.access_token;
};

export const getArtistId = async (token, artistName) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1&market=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok || !data.artists.items.length) {
    console.error('Artist ID fetch failed:', data);
    return null;
  }

  return data.artists.items[0].id;
};

export const getArtistAlbums = async (token, artistId) => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=20&market=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    console.error('Artist Albums fetch failed:', data);
    return [];
  }

  // Remove duplicates by name 
  const uniqueAlbums = [];
  const names = new Set();

  for (const album of data.items) {
    if (!names.has(album.name)) {
      names.add(album.name);
      uniqueAlbums.push(album);
    }
  }

  return uniqueAlbums;
};

export const getAlbumTracks = async (token, albumId) => {
  const trackRes = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks?market=US`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const trackData = await trackRes.json();

  if (!trackRes.ok || !Array.isArray(trackData.items)) {
    console.error('Failed to fetch basic tracks', trackData);
    return [];
  }

  const fullTracks = await Promise.all(
    trackData.items.map(async (track) => {
      const res = await fetch(`https://api.spotify.com/v1/tracks/${track.id}?market=US`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        preview_url: data.preview_url,
        albumImage: data.album?.images?.[0]?.url || null,
        is_playable: data.is_playable,
        duration_ms: data.duration_ms,
        spotify_url: data.external_urls?.spotify,
      };
    })
  );

  return fullTracks;
};