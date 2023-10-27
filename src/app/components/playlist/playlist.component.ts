import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist: Array<Track>;
  trackPlaying: boolean;

  constructor(private shared: SharedService) {
    this.playlist = [];
    this.trackPlaying = false;
  }

  ngOnInit(): void {
    this.shared.playlist$.subscribe(playlist => this.playlist = playlist);
  }

  playOrPauseTrack(track: Track) {
    track.isPlaying = !track.isPlaying;
  }

  removeTrackFromPlaylist(trackToDelete: Track) {
    this.playlist = this.playlist.filter(track => track.trackId !== trackToDelete.trackId);
    this.shared.addPlaylist(this.playlist);
  }
}
