import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @Input() color: string = "";
  @Output() goToPlaylistEmitter: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor() {
  }

  ngOnInit(): void {
  }

  goToPlaylist() {
    this.goToPlaylistEmitter.emit(true);
  }
}
