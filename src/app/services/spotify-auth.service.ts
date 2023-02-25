import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  constructor() { }

  getAuthorization() {
    let query_parameters = new URLSearchParams({
      response_type: 'code',
      client_id: environment.client_id,
      scope: environment.scope,
      redirect_uri: environment.redirect_uri
    });

    window.location.href = 'https://accounts.spotify.com/authorize?' + query_parameters.toString();
  }
}
