import {
  getSpotifyToken,
  getArtistId,
  getArtistAlbums,
  getAlbumTracks,
} from '@/app/lib/spotify';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');
    const withTracks = searchParams.get('withTracks');

    if (!artist) {
      console.error("❌ Missing artist in query");
      return Response.json({ error: 'Missing artist name' }, { status: 400 });
    }

    const token = await getSpotifyToken();
    const artistId = await getArtistId(token, artist);
    if (!artistId) {
      console.error(`❌ No artistId found for ${artist}`);
      return Response.json({ error: `Artist not found: ${artist}` }, { status: 404 });
    }

    const albums = await getArtistAlbums(token, artistId);

    if (withTracks === 'true') {
      const albumsWithTracks = await Promise.all(
        albums.map(async (album) => {
          try {
            const tracks = await getAlbumTracks(token, album.id);
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
    console.error('🔥 API Server Error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
