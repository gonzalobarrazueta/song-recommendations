import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { SpotifyService } from "../../services/spotify.service";
import { MatDrawer } from "@angular/material/sidenav";
import { MediaMatcher } from "@angular/cdk/layout";
import { SpotifyAuthService } from "../../services/spotify-auth.service";

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
  @ViewChild(MatDrawer) drawer: any;
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  amountOfTracksToReturn: number = 6;

  constructor(private shared: SharedService, private spotifyService: SpotifyService, private auth: SpotifyAuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.shared.playlist$.subscribe(playlist => this.playlist = playlist);
    this.mobileQuery = media.matchMedia('(min-width: 1400px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.shared.amountOfTracks$.subscribe(amount => this.amountOfTracksToReturn = amount);
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.tracks = JSON.parse(urlParams.get("data") as string);
    this.accessToken = this.auth.accessToken;
  }

  getRecommendationsPerTrack(track: Track) {
    this.loading = true;
    this.getRecommendations(track, this.amountOfTracksToReturn)
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("Request failed with status " + response.status);
      })
      .then(data => {
        this.handleRecommendationsResponse(data)
          .then(data => { this.tracks = this.tracks.concat(data); })
          .then(() => { this.loading = false; });
      })
      .catch(error => {
        this.loading = false;
        console.error("Error:", error);
      });
  }

  async getRecommendations(track: Track, amount: number) {
    return await this.spotifyService.getRecommendations(this.accessToken, amount, "PE", [track.artist.id], [], [track.trackId])
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

  deleteFromPlaylist(trackIdToDelete: string) {
    let idToDelete = this.playlist.findIndex(track => track.trackId === trackIdToDelete);
    if (idToDelete !== -1) this.playlist.splice(idToDelete, 1);
  }

  openPlaylist() {
    this.shared.addPlaylist(this.playlist);
    this.drawer.toggle();
  }
}
