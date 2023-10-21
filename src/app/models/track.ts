export interface Track {
  name: string,
  img: string,
  trackId: string,
  spotifyUrl: string,
  previewUrl: string | null,
  artist: { id: string, name: string, img: string }
}
