import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailGameComponent } from './detail-game/detail-game.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateEditGameComponent } from './create-edit-game/create-edit-game.component';
import { CreateGameComponent } from './create-edit-game/create-game/create-game.component';
import { EditGameComponent } from './create-edit-game/edit-game/edit-game.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { CreateUserComponent } from './create-edit-user/create-user/create-user.component';
import { EditUserComponent } from './create-edit-user/edit-user/edit-user.component';
import { EditImageMHComponent } from './create-edit-game/edit-game/edit-image-mh/edit-image-mh.component';
import { EditTheloaiComponent } from './create-edit-game/edit-game/edit-theloai/edit-theloai.component';
import { CreateImageLogoComponent } from './create-edit-game/create-game/create-image-logo/create-image-logo.component';
import { CreateTheloaiComponent } from './create-edit-game/create-game/create-theloai/create-theloai.component';
import { GameDownloadComponent } from './game-download/game-download.component';
import { GameLikeComponent } from './game-like/game-like.component';
import { OtherComponent } from './other/other.component';
import { TheloaiComponent } from './theloai/theloai.component';
import { TheloaiEditComponent } from './theloai/theloai-edit/theloai-edit.component';
const routes: Routes = [
  {path:"", component:GameComponent},
  {path:"game", component:GameComponent},
  {path:"game/:theloai", component:GameComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"detail_game/:id", component:DetailGameComponent},
  {path:"user_profile/:id", component:UserProfileComponent},
  {path:"user_profile", component:UserProfileComponent},
  {path:"create-edit-game", component:CreateEditGameComponent},
  {path:"create-game", component:CreateGameComponent},
  {path:"edit-game/:id", component:EditGameComponent},
  {path:"create-edit-user", component:CreateEditUserComponent},
  {path:"create-user", component:CreateUserComponent},
  {path:"edit-user/:id", component:EditUserComponent},
  {path:"edit-game/edit-imageMH/:id", component:EditImageMHComponent},
  {path:"edit-game/edit-theloai/:id", component:EditTheloaiComponent},
  {path:"create-game/create-imageMH/:id", component:CreateImageLogoComponent},
  {path:"create-game/create-theloai/:id", component:CreateTheloaiComponent},
  {path:"game-download/:id", component:GameDownloadComponent},
  {path:"game-like/:id", component:GameLikeComponent},
  {path:"other/:keyword", component:OtherComponent},
  {path:"theloai", component:TheloaiComponent},
  {path:"theloai-edit/:id", component:TheloaiEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
