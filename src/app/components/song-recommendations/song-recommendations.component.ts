import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-song-recommendations',
  templateUrl: './song-recommendations.component.html',
  styleUrls: ['./song-recommendations.component.scss']
})
export class SongRecommendationsComponent implements OnInit {

  private accessToken: string = "";
  tracks: Track[] = [];
  loading: boolean = false;
  buildTracks: ((track: any) => Track);

  constructor(private sharedService: SharedService, private spotifyService: SpotifyService) {
    this.buildTracks = this.sharedService.buildTracks;
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.tracks = JSON.parse(urlParams.get("data") as string);
    this.accessToken = this.sharedService.accessToken;
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
      newTrack = this.buildTracks(track);
      _recommendations.push(newTrack);
    }
    return _recommendations;
  }
}
