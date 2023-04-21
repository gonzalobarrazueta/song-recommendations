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

  getAccessToken(authCode: string): Observable<any> {

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: environment.redirect_uri
    });

    let headers = new HttpHeaders().
      set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(`${environment.client_id}:${environment.client_secret}`));

    return this.http.post('https://accounts.spotify.com/api/token', body, { headers });
  }
}
