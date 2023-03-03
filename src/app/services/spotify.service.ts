import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

let base_address = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getUsersTopItems(access_token: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get(`${base_address}/me`, { headers });
  }
}
