import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthCallbackComponent,
    SongCardComponent,
    SongListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
