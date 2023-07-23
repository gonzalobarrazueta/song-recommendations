import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { SpotifyAuthService } from "../../services/spotify-auth.service";
import { SpotifyService } from "../../services/spotify.service";
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss', '../home/home.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';
  private access_token: string = '';
  top_tracks: Track[] = [];
  buildTracks: ((track: any) => Track);
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private spotifyAuth: SpotifyAuthService, private spotify: SpotifyService, private sharedService: SharedService) {
    this.buildTracks = this.sharedService.buildTracks;
  }

  ngOnInit(): void {
    this.getAuthorization();
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
        this.sharedService.accessToken = data.access_token;
        this.access_token = data.access_token;
      })
      .catch(error => console.error("Error:", error));
  }

  getUserTopTracks() {
    this.loading = true;
    this.spotify.getTopItems(this.access_token, "tracks", 6)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Request failed with status " + response.status);
      })
      .then(data => {
        for (let i = 0; i < data.items.length; i++) {
          this.top_tracks.push(this.buildTracks(data.items[i]));
        }
        this.loading = false;
        this.navigateToRecommendationsComponent();
      })
      .catch(error => console.error("Error:", error))
  }

  navigateToRecommendationsComponent() {
    const navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(this.top_tracks) }
    };
    this.router.navigate(["/recommendations"], navigationExtras);
  }
}
