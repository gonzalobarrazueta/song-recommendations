import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { SpotifyAuthService } from "../../services/spotify-auth.service";
import { SpotifyService } from "../../services/spotify.service";
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss', '../home/home.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';
  private access_token: string = '';
  top_tracks: Array<Track> = [];
  loading: boolean = false;
  tracksAmount: Array<number> = [6, 10, 12];
  timeRange: Array<string> = ["last 4 weeks", "last 6 months", "all time"]
  configForm = new FormGroup({
    limit: new FormControl(),
    range: new FormControl()
  });

  constructor(private auth: SpotifyAuthService,
              private spotify: SpotifyService,
              private shared: SharedService,
              private router: Router) {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.auth_code = urlParams.get("code") as string;
    this.getAuthorization();
  }

  getAuthorization() {
    this.auth.getAccessToken(this.auth_code)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Request failed with status " + response.status);
      })
      .then(data => {
        this.auth.accessToken = data.access_token;
        this.access_token = data.access_token;
        this.getUserProfile();
      })
      .catch(error => console.error("Error:", error));
  }

  getUserTopTracks() {
    this.loading = true;
    let limit: number = this.configForm.value.limit ?? 6;
    let timeRange: string = this.shared.getTimeRange(this.configForm.value.range ?? "short_term");

    this.spotify.getTopItems(this.access_token, "tracks", limit, timeRange)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Request failed with status " + response.status);
      })
      .then(data => {
        for (let i = 0; i < data.items.length; i++) {
          this.top_tracks.push(this.shared.buildTracks(data.items[i]));
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

  getUserProfile() {
    this.spotify.getCurrentUserProfile(this.access_token)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Request failed with status " + response.status);
      })
      .then(user => this.shared.setUser({ id: user.id}))
      .catch(error => console.error("Error:", error));
  }
}
