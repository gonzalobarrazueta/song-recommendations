import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedService } from "../../services/shared.service";
import { Track } from "../../models/track";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @Output() goToPlaylistEmitter: EventEmitter<boolean> = new EventEmitter<boolean>;
  @ViewChild('musicPlayer') musicPlayer: any;
  track: Track = {} as Track;

  constructor(private shared: SharedService) {
    this.shared.playTrack$.subscribe(track => {
      this.track = track;
      if (this.musicPlayer) {
        this.addAudioSource(track.previewUrl);
        this.playTrack();
      }
    });
  }

  ngOnInit(): void {
  }

  goToPlaylist() {
    this.goToPlaylistEmitter.emit(true);
  }

  onPlayButtonClick() {
    if (this.track.isPlaying) {
      this.track.isPlaying = false;
      this.pauseTrack();
    } else {
      this.track.isPlaying = true;
      this.playTrack();
    }
  }

  playTrack() {
    this.musicPlayer.nativeElement.play();
  }

  pauseTrack() {
    this.musicPlayer.nativeElement.pause();
  }

  addAudioSource(src: string | null) {
    this.musicPlayer.nativeElement.src = src;
    this.musicPlayer.nativeElement.load();
  }
}
