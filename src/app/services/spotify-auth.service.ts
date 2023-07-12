import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  constructor(private http: HttpClient) { }

  getAuthorization() {
    let query_parameters = new URLSearchParams({
      response_type: 'code',
      client_id: environment.client_id,
      scope: environment.scope,
      redirect_uri: environment.redirect_uri
    });

    window.location.assign('https://accounts.spotify.com/authorize?' + query_parameters.toString());
  }

  async getAccessToken(authCode: string) {
    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: environment.redirect_uri
    });

    let headers = new Headers();
    headers.set('content-type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', 'Basic ' + btoa(`${environment.client_id}:${environment.client_secret}`));

    let response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: headers,
      body: body
    })

    return response
  }
}
