import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist: Array<Track>;
  trackPlaying: boolean;

  constructor(private shared: SharedService, private spotify: SpotifyService) {
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
      this.spotify.createPlaylist(this.shared.accessToken, userId.id)
        .then(response => {
          if (!response.ok) throw new Error("Request failed with status " + response.status);
        })
        .catch(error => console.log(error));
    })
  }
}
