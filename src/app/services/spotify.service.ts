import { Injectable } from '@angular/core';

let base_address = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  async getTopItems(access_token: string, type: string, limit: number) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: headers
    }

    return fetch(`${base_address}/me/top/${type}?time_range=short_term&limit=${limit}`, requestOptions);
  }

  getArtistById(access_token: string, id: string) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: headers
    }

     return fetch(`${base_address}/artists/${id}`, requestOptions);
  }
}
