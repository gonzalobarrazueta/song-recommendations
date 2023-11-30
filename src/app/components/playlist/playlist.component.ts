import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { SpotifyService } from "../../services/spotify.service";
import { SpotifyAuthService } from "../../services/spotify-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist: Array<Track>;
  trackPlaying: boolean;

  constructor(private shared: SharedService,
              private snackBar: MatSnackBar,
              private spotify: SpotifyService,
              private auth: SpotifyAuthService
  ) {
    this.playlist = [];
    this.trackPlaying = false;
  }

  ngOnInit(): void {
    this.shared.playlist$.subscribe(playlist => this.playlist = playlist);
  }

  removeTrackFromPlaylist(trackToDelete: Track) {
    this.playlist = this.playlist.filter(track => track.trackId !== trackToDelete.trackId);
    this.shared.addPlaylist(this.playlist);
  }

  uploadPlaylist() {
    this.shared.currentUser$.subscribe(userId => {
      this.spotify.createPlaylist(this.auth.accessToken, userId.id)
        .then(response => {
          if (response.ok) {
            this.openSnackBar();
            return response.json();
          }
          else throw new Error("Request failed with status " + response.status);
        })
        .then(playlist => this.addTracksToPlaylist(playlist.id))
        .catch(error => console.log(error));
    })
  }

  addTracksToPlaylist(playlistId: string) {
    this.spotify.addTracksToPlaylist(this.auth.accessToken, playlistId, this.getSpotifyUris())
      .then(response => {
        if (!response.ok) throw new Error("Request failed with status " + response.status);
      })
      .catch(error => console.log(error));
  }

  getSpotifyUris(): Array<string> {
    let uris: Array<string> = [];
    for (let track of this.playlist) uris.push(track.spotifyUri);
    return uris;
  }

  openSnackBar() {
    this.snackBar.open("Playlist uploaded to Spotify! ✅", 'Close', {
      duration: 3000,
      panelClass: ['playlistAddedSnack']
    });
  }
}
