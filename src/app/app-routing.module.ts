import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { SongRecommendationsComponent } from "./song-recommendations/song-recommendations.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'authCallback', component: AuthCallbackComponent },
  { path: 'recommendations', component: SongRecommendationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
