import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from "../../services/spotify-auth.service";
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private auth: SpotifyAuthService, private router: Router, private shared: SharedService) {
    this.shared.isLoggedIn$.subscribe(status => this.isLoggedIn= status);
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/home"]);
  }
}
