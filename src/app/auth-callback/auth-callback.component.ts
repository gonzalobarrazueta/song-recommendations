import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import { SpotifyAuthService } from "../services/spotify-auth.service";
import { SpotifyService } from "../services/spotify.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';
  private access_token: string = '';

  top_tracks: any[] = [];
  artists: Object = {};

  constructor(private route: ActivatedRoute, private spotifyAuth: SpotifyAuthService, private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.getAuthCode();
    this.getAccessToken();
  }

  getAuthCode() {
    const params$ = this.route.queryParams;
    params$.subscribe((params) => {
      this.auth_code = params['code'];
      console.log('Auth code', this.auth_code);
    });
  }

  getAccessToken() {
    const access_token$ = this.spotifyAuth.getAccessToken(this.auth_code).pipe(delay(3000));
    access_token$.subscribe({
      next: (response) => {
        this.access_token = response.access_token;
        console.log('Access token', this.access_token);
      }
    });
  }

  getTopTracks() {
    const top_tracks$ = this.spotify.getTopItems(this.access_token, 'tracks');
    top_tracks$.subscribe((response: any) => {
      for (let track of response['items']) {
        this.top_tracks.push(track);
      }
    });
  }

  getArtist(artist_id: string) {
    const artist$ = this.spotify.getArtistById(this.access_token, artist_id);
    artist$.subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }
}
