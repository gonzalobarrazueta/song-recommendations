import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Track } from "../../models/track";
import { average } from "color.js";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input() song!: Track;
  @Output() request: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addToPlaylistEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('musicPlayer') musicPlayer: any;
  gradient: string = "";
  borderColor: string = "";
  averageColor: string = "";

  constructor() {
    this.borderColor = "border-color: #F7F2E3;";
  }

  ngOnInit(): void {
    this.getImageColors()
      .then(averageColor => {
        this.averageColor = `${averageColor}`;
        this.gradient = `background: radial-gradient(farthest-corner at 1px 1px, #F0F7FF 0%, ${averageColor}  100%);`;
      })
      .catch(console.error)
  }

  async getImageColors() {
    return await average(this.song.img, { format: "hex" })
  }

  requestRecommendations() {
    this.request.emit(true);
  }

  addToPlaylist() {
    this.addToPlaylistEmitter.emit(true);
  }

  onPlayButtonClick(track: Track) {
    if (track.isPlaying) {
      track.isPlaying  = false;
      this.pauseTrack();
    } else {
      track.isPlaying = true;
      this.playTrack();
    }
  }

  playTrack() {
    this.musicPlayer.nativeElement.play();
  }

  pauseTrack() {
    this.musicPlayer.nativeElement.pause();
  }
}
