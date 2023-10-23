import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  tracks: Array<Track>;
  trackPlaying: boolean;

  constructor(private route: ActivatedRoute) {
    this.tracks = [];
    this.trackPlaying = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tracks = JSON.parse(params['data']);
      console.log(this.tracks)
    });
  }

  playOrPauseTrack(track: Track) {
    track.isPlaying = !track.isPlaying;
  }
}
