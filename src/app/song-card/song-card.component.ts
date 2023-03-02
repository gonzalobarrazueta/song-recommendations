import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  song_title: string;
  artist_name: string;
  img_url: string;
  profile_photo_url: string;
  gradient: string;
  border_color: string;

  constructor() {
    this.song_title = 'Good Night Good Dream';
    this.artist_name = 'Nerd Connection';
    this.img_url = 'https://m.media-amazon.com/images/I/51vAEyKxOiL._UXNaN_FMjpg_QL85_.jpg';
    this.profile_photo_url = 'https://i.scdn.co/image/ab6761610000e5ebcd016d0a0783a321312e1733';
    this.gradient = 'background: linear-gradient(180deg, #EFDFCF 0%, #F7F2E3 56.68%, rgba(255, 255, 255, 0.9) 100%);';
    this.border_color = 'border-color: #F7F2E3;';
  }

  ngOnInit(): void {
  }

}
