import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyAuthService } from "../services/spotify-auth.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';

  constructor(private route: ActivatedRoute, private spotifyAuth: SpotifyAuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (query_params) => {
        this.auth_code = query_params['code'];
      });
  }

  getAccessToken() {
    this.spotifyAuth.getAccessToken(this.auth_code).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    });
  }
}
