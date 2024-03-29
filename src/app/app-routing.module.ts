import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AuthCallbackComponent } from "./components/auth-callback/auth-callback.component";
import { SongRecommendationsComponent } from "./components/song-recommendations/song-recommendations.component";
import { PlaylistComponent } from "./components/playlist/playlist.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'authCallback', component: AuthCallbackComponent },
  { path: 'recommendations', component: SongRecommendationsComponent },
  { path: 'playlist', component: PlaylistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
