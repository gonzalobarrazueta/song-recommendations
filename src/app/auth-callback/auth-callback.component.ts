import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyAuthService } from "../services/spotify-auth.service";
import { SpotifyService } from "../services/spotify.service";
import { Track } from "../models/track";

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
    this.getAuthorization();
    setTimeout(() => this.getUserTopItems(), 1000)
  }

  getAuthorization() {
    const urlParams = new URLSearchParams(window.location.search);
    this.auth_code = urlParams.get("code") as string;
    this.spotifyAuth.getAccessToken(this.auth_code)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then(data => {
        this.access_token = data.access_token;
      })
      .catch(error => console.error("Error:", error));
  }

  getUserTopItems() {
    this.spotify._getTopItems(this.access_token, "tracks")
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error("Error:", error))
  }
}
