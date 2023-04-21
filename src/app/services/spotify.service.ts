import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

let base_address = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getTopItems(access_token: string, type: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get(`${base_address}/me/top/${type}?time_range=short_term&limit=4`, {headers});
  }

  getArtistById(access_token: string, id: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
     return this.http.get(`${base_address}/artists/${id}`, {headers});
  }
}
