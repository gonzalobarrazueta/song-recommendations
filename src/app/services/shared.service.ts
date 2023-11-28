import { Injectable } from '@angular/core';
import { Track } from "../models/track";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private playTrackSubject: BehaviorSubject<Track>;
  public playTrack$: Observable<Track>;
  private playlistSubject: BehaviorSubject<Array<Track>>;
  public playlist$: Observable<Array<Track>>
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor() {
    this.playTrackSubject = new BehaviorSubject<Track>({} as Track);
    this.playTrack$ = this.playTrackSubject.asObservable();
    this.playlistSubject = new BehaviorSubject<Array<Track>>([]);
    this.playlist$ = this.playlistSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  buildTracks(track: any): Track {
    return {
      name: track.name,
      img: track.album.images[1].url,
      trackId: track.id,
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
      spotifyUri: track.uri,
      isPlaying: false,
      artist: {
        id: track.artists[0].id,
        name: track.artists[0].name,
        img: ''
      }
    }
  }

  getTimeRange(timeRange: string): string {
    switch (timeRange) {
      case "last 4 weeks":
        return "short_term";
      case "last 6 months":
        return "medium_term";
      case "all time":
        return "long_term";
      default:
        return "short_term";
    }
  }

  playTrack(trackPlaying: Track) {
    this.playTrackSubject.next(trackPlaying);
  }

  addPlaylist(playlist: Array<Track>) {
    this.playlistSubject.next(playlist);
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
