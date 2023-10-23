import { Injectable } from '@angular/core';
import { Track } from "../models/track";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _accessToken: string;

  constructor() {
    this._accessToken = "";
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  buildTracks(track: any): Track {
    return {
      name: track.name,
      img: track.album.images[1].url,
      trackId: track.id,
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
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
}
