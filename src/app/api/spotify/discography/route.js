// src/app/api/spotify/discography/route.js
import {
  getSpotifyToken,
  getArtistId,
  getArtistAlbums,
} from '@/app/lib/spotify';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist');
  const withTracks = searchParams.get('withTracks');

  if (!artist) {
    return Response.json({ error: 'Missing artist name' }, { status: 400 });
  }

  try {
    const token = await getSpotifyToken();
    const artistId = await getArtistId(token, artist);
    if (!artistId) {
      return Response.json({ error: 'Artist not found' }, { status: 404 });
    }

    const albums = await getArtistAlbums(token, artistId);

    return Response.json(albums);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
