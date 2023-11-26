import { Injectable } from '@angular/core';

let base_address = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  async getTopItems(access_token: string, type: string, limit: number, timeRange: string) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: headers
    }

    return fetch(`${base_address}/me/top/${type}?time_range=${timeRange}&limit=${limit}`, requestOptions);
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

  getRecommendations(access_token: string, limit: number, market: string, seedArtists: string[], seedGenres: string[], seedTracks: string[]) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: headers
    }

    return fetch(`${base_address}/recommendations?limit=${limit}&market=${market}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`, requestOptions);
  }

  getCurrentUserProfile(access_token: string) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);

    const requestOptions = {
      method: "GET",
      headers: headers
    }

    return fetch(`${base_address}/me`, requestOptions);
  }

  createPlaylist(access_token: string, userId: string) {
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${access_token}`);
    headers.set('Content-Type', 'application/json');

    let playlistInfo = {
      name: "Music Loop Playlist",
      description: "Playlist created from the Music Loop app"
    }

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(playlistInfo)
    }

    return fetch(`${base_address}/users/${userId}/playlists`, requestOptions);
  }
}
