import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from "../services/spotify-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private spotifyAuth: SpotifyAuthService) { }

  ngOnInit(): void {
  }

  getAuthorization() {
    this.spotifyAuth.getAuthorization();
  }
}
