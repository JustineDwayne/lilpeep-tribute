// lib/spotify.js
export const getSpotifyToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT;
  const client_secret = process.env.SPOTIFY_SECRET;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  const data = await response.json();
  return data.access_token;
};

export const getArtistId = async (token, artistName) => {
  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.artists.items[0]?.id;
};

export const getArtistAlbums = async (token, artistId, options = {}) => {
  const {
    includeGroups = 'album,single',
    market = 'US',
    limit = 10,
  } = options;

  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${includeGroups}&market=${market}&limit=${limit}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.items;
};
