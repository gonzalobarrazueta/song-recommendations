import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { SpotifyAuthService } from "../services/spotify-auth.service";
import { SpotifyService } from "../services/spotify.service";
import { Track } from "../models/track";
import { Observable } from "rxjs";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';
  private access_token: string = '';

  top_tracks: Track[] = [];
  artists = new Map();

  constructor(private route: ActivatedRoute, private spotifyAuth: SpotifyAuthService, private spotify: SpotifyService) {}

  ngOnInit(): void {
    // Gets auth code and access token
    const params$: Observable<Params> = this.route.queryParams;
    params$.subscribe((params) => {
      this.auth_code = params['code']
      console.log(`Auth code: ${this.auth_code}`)

      const access_token$ = this.spotifyAuth.getAccessToken(this.auth_code)
      access_token$.subscribe(response => {
        this.access_token = response.access_token;
      });
    });
  }

  getTopTracks() {
    let track: Track;
    const top_tracks$ = this.spotify.getTopItems(this.access_token, 'tracks');

    top_tracks$.subscribe((response: any) => {
      for (let _track of response['items']) {
        track = {
          name: _track.name,
          img: _track.album.images[1].url,
          artist: {
            id: _track.artists[0].id,
            name: _track.artists[0].name,
            img: ''
          }
        }
        this.top_tracks.push(track);
      }
    });
  }

  getTopTracksArtists() {
    for (let i = 0; i < this.top_tracks.length; i++) {
      const artist$ = this.spotify.getArtistById(this.access_token, this.top_tracks[i].artist.id);

      artist$.subscribe((artist: any) => {
        this.top_tracks[i].artist['img'] = artist.images[2].url;
      })
    }
  }

  getUsersTopSongs() {
    this.getTopTracks();
    this.getTopTracksArtists();
    console.log(this.top_tracks);
  }
}
