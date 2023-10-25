import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @Output() goToPlaylistEmitter: EventEmitter<boolean> = new EventEmitter<boolean>;
  isPlaying: boolean = false;

  constructor(private shared: SharedService) {
    this.shared.playTrack$.subscribe(trackIsPlaying => {
      this.isPlaying = trackIsPlaying;
    });
  }

  ngOnInit(): void {
  }

  goToPlaylist() {
    this.goToPlaylistEmitter.emit(true);
  }
}
