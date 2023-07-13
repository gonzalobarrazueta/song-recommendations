import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Track } from "../models/track";

@Component({
  selector: 'app-song-recommendations',
  templateUrl: './song-recommendations.component.html',
  styleUrls: ['./song-recommendations.component.scss']
})
export class SongRecommendationsComponent implements OnInit {

  topTracks: Track[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.topTracks = JSON.parse(urlParams.get("data") as string);
  }

}
