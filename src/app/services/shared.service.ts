import { Injectable } from '@angular/core';
import { Track } from "../models/track";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _accessToken: string;
  private _artistsProfilePhotos: BehaviorSubject<Map<string, string>>;

  constructor() {
    this._accessToken = "";
    this._artistsProfilePhotos = new BehaviorSubject<Map<string, string>>(new Map());
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get artistsProfilePhotos(): BehaviorSubject<Map<string, string>> {
    return this._artistsProfilePhotos;
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

  // if the artist has a profile photo, the method will return the photo's url, else it will return a template photo
  mapArtistToPhoto(responseArtist: any, artistsPhotos: Map<string, string>): Map<string, string> {
    if (responseArtist.images.length > 0) {
      artistsPhotos.set(responseArtist.id, responseArtist.images[2].url);
    } else {
      artistsPhotos.set(responseArtist.id, "../../assets/images/artist_profile_template.png");
    }
    return artistsPhotos;
  }
}
