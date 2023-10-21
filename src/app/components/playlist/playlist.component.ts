import { Component, OnInit } from '@angular/core';
import { Track } from "../../models/track";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  tracks: Array<Track>;
  trackPlaying: boolean;

  constructor() {
    this.tracks = [{
      "name": "Uncomfortable",
      "img": "https://i.scdn.co/image/ab67616d00001e027e20b2fb207b843f967890d6",
      "trackId": "4BreyjJu4w5EUhTKPIQymq",
      "spotifyUrl": "https://open.spotify.com/track/4BreyjJu4w5EUhTKPIQymq",
      "artist": {
        "id": "0NIPkIjTV8mB795yEIiPYL",
        "name": "Wallows",
        "img": ""
      }
    }, {
      "name": "pretty isn’t pretty",
      "img": "https://i.scdn.co/image/ab67616d00001e02e85259a1cae29a8d91f2093d",
      "trackId": "6W9l02gRsXVxzIuQC1oc1X",
      "spotifyUrl": "https://open.spotify.com/track/6W9l02gRsXVxzIuQC1oc1X",
      "artist": {
        "id": "1McMsnEElThX1knmY4oliG",
        "name": "Olivia Rodrigo",
        "img": ""
      }
    }, {
      "name": "ballad of a homeschooled girl",
      "img": "https://i.scdn.co/image/ab67616d00001e02e85259a1cae29a8d91f2093d",
      "trackId": "5sp71CUt0jXRNqHblPGp7b",
      "spotifyUrl": "https://open.spotify.com/track/5sp71CUt0jXRNqHblPGp7b",
      "artist": {
        "id": "1McMsnEElThX1knmY4oliG",
        "name": "Olivia Rodrigo",
        "img": ""
      }
    }, {
      "name": "get him back!",
      "img": "https://i.scdn.co/image/ab67616d00001e02e85259a1cae29a8d91f2093d",
      "trackId": "2gyxAWHebV7xPYVxqoi86f",
      "spotifyUrl": "https://open.spotify.com/track/2gyxAWHebV7xPYVxqoi86f",
      "artist": {
        "id": "1McMsnEElThX1knmY4oliG",
        "name": "Olivia Rodrigo",
        "img": ""
      }
    }, {
      "name": "all-american bitch",
      "img": "https://i.scdn.co/image/ab67616d00001e02e85259a1cae29a8d91f2093d",
      "trackId": "34sOdxWu9FljH84UXdRwu1",
      "spotifyUrl": "https://open.spotify.com/track/34sOdxWu9FljH84UXdRwu1",
      "artist": {
        "id": "1McMsnEElThX1knmY4oliG",
        "name": "Olivia Rodrigo",
        "img": ""
      }
    }]
    this.trackPlaying = false;
  }

  ngOnInit(): void {
  }

  playOrPauseTrack() {
    this.trackPlaying = !this.trackPlaying;
  }
}
