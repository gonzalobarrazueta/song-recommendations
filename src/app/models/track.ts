export interface Track {
  name: string,
  img: string,
  trackId: string,
  spotifyUrl: string,
  spotifyUri: string,
  previewUrl: string | null,
  isPlaying: boolean,
  artist: { id: string, name: string, img: string }
}
