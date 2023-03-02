import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyAuthService } from "../services/spotify-auth.service";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private auth_code: string = '';
  private access_token: string = '';

  constructor(private route: ActivatedRoute, private spotifyAuth: SpotifyAuthService) {}

  ngOnInit(): void {
    this.getAuthCode();
    this.getAccessToken();
  }

  getAuthCode() {
    const params$ = this.route.queryParams;
    params$.subscribe((params) => {
      this.auth_code = params['code'];
      console.log('Auth code', this.auth_code);
    });
  }

  getAccessToken() {
    const access_token$ = this.spotifyAuth.getAccessToken(this.auth_code).pipe(delay(3000));
    access_token$.subscribe({
      next: (response) => {
        this.access_token = response.access_token;
        console.log('Access token', this.access_token);
      }
    });
  }
}
