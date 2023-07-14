import { Injectable } from '@angular/core';
import {Track} from "../models/track";

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
      artist: {
        id: track.artists[0].id,
        name: track.artists[0].name,
        img: ''
      }
    }
  }
}
