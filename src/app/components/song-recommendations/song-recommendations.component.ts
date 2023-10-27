import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { SpotifyService } from "../../services/spotify.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-song-recommendations',
  templateUrl: './song-recommendations.component.html',
  styleUrls: ['./song-recommendations.component.scss']
})
export class SongRecommendationsComponent implements OnInit {

  private accessToken: string = "";
  tracks: Track[] = [];
  playlist: Track[] = [];
  loading: boolean = false;

  constructor(private shared: SharedService, private spotifyService: SpotifyService, private router: Router) {
    this.shared.playlist$.subscribe(playlist => this.playlist = playlist);
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.tracks = JSON.parse(urlParams.get("data") as string);
    this.accessToken = this.shared.accessToken;
  }

  getRecommendationsPerTrack(track: Track) {
    this.loading = true;
    this.getRecommendations(track)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then(data => {
        this.handleRecommendationsResponse(data)
          .then(data => {
            this.tracks = this.tracks.concat(data);
          })
          .then(() => {
            this.loading = false;
          });
      })
      .catch(error => {
        this.loading = false;
        console.error("Error:", error);
      });
  }

  async getRecommendations(track: Track) {
    return await this.spotifyService.getRecommendations(this.accessToken, 6, "PE", [track.artist.id], [], [track.trackId])
  }

  async handleRecommendationsResponse(data: any) {
    let recommendations = data.tracks;
    let _recommendations: Track[] = [];
    let newTrack: Track;
    for (let track of recommendations) {
      newTrack = this.shared.buildTracks(track);
      _recommendations.push(newTrack);
    }
    return _recommendations;
  }

  addToPlaylist(track: Track) {
    this.playlist.push(track);
  }

  redirectToPlaylist() {
    this.shared.addPlaylist(this.playlist);
    this.router.navigate(['/playlist']);
  }
}
