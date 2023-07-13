import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
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
  private responseTracks: Array<any> = [];
  top_tracks: Track[] = [];
  artists = new Map();

  constructor(private route: ActivatedRoute, private router: Router, private spotifyAuth: SpotifyAuthService, private spotify: SpotifyService) {}

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
        this.access_token = data.access_token;
      })
      .catch(error => console.error("Error:", error));
  }

  getUserTopTracks() {
    this.spotify.getTopItems(this.access_token, "tracks", 6)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then(data => {
        this.responseTracks = data.items;
        let tracks = this.responseTracks;
        for (let i = 0; i < tracks.length; i++) {
          this.top_tracks.push(this.buildTracks(tracks[i]));
        }
        this.assignArtistToTracks()
          .then(() => {
            this.navigateToRecommendationsComponent();
          })
          .catch(error => console.error("Error:", error));
      })
      .catch(error => console.error("Error:", error))
  }

  buildTracks(track: any): Track {
    return {
      name: track.name,
      img: track.album.images[1].url,
      artist: {
        id: track.artists[0].id,
        name: track.artists[0].name,
        img: ''
      }
    }
  }

  async assignArtistToTracks() {
    for (let i = 0; i < this.top_tracks.length; i++) {
      try {
        const response = await this.spotify.getArtistById(this.access_token, this.top_tracks[i].artist.id);
        if (response.ok) {
          const responseArtist = await response.json();
          this.mapArtists(responseArtist);
          this.top_tracks[i].artist.img = this.artists.get(responseArtist.id);
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  mapArtists(responseArtist: any) {
    if (responseArtist.images.length > 0) {
      this.artists.set(responseArtist.id, responseArtist.images[2].url);
    } else {
      this.artists.set(responseArtist.id, "../../assets/images/artist_profile_template.png");
    }
  }

  navigateToRecommendationsComponent() {
    const navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(this.top_tracks) }
    };
    this.router.navigate(["/recommendations"], navigationExtras);
  }
}
