// api/deezer/discography/route.js
import {
  searchArtist,
  getArtistAlbums,
  getAlbumTracks,
} from '@/app/lib/deezer';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');
    const withTracks = searchParams.get('withTracks');

    if (!artist) {
      console.error("❌ Missing artist in query");
      return Response.json({ error: 'Missing artist name' }, { status: 400 });
    }

    // Search for artist
    const artistData = await searchArtist(artist);
    if (!artistData) {
      console.error(`❌ No artist found for ${artist}`);
      return Response.json({ error: `Artist not found: ${artist}` }, { status: 404 });
    }

    // Get artist's albums
    const albums = await getArtistAlbums(artistData.id);

    if (withTracks === 'true') {
      const albumsWithTracks = await Promise.all(
        albums.map(async (album) => {
          try {
            const tracks = await getAlbumTracks(album.id);
            return { ...album, tracks };
          } catch (trackErr) {
            console.error(`❌ Failed to get tracks for album ${album.id}`, trackErr);
            return { ...album, tracks: [] };
          }
        })
      );
      return Response.json(albumsWithTracks);
    }

    return Response.json(albums);
  } catch (error) {
    console.error('🔥 Deezer API Server Error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}