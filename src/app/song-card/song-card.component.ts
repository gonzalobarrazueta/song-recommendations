import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../models/track";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input() song!: Track;
  gradient: string = '';
  border_color: string = '';

  constructor() {
    this.gradient = 'background: linear-gradient(180deg, #EFDFCF 0%, #F7F2E3 56.68%, rgba(255, 255, 255, 0.9) 100%);';
    this.border_color = 'border-color: #F7F2E3;';
  }

  ngOnInit(): void {
  }

}
