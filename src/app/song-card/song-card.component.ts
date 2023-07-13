import { Component, Input, OnInit } from '@angular/core';
import { Track } from "../models/track";
import { average } from "color.js";

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
    this.border_color = 'border-color: #F7F2E3;';
  }

  ngOnInit(): void {
    this.getImageColors()
      .then(averageColor => {
        this.gradient = `background: radial-gradient(farthest-corner at 1px 1px, #F0F7FF 0%, ${averageColor}  100%);`;
      })
      .catch(console.error)
  }

  async getImageColors() {
    return await average(this.song.img, { format: "hex" })
  }
}
