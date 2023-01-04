import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
import { TheloaiEditComponent } from './theloai/theloai-edit/theloai-edit.component';

// add service
import { SharedService } from './shared.service'; 
//add phương thức http
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateImageLogoComponent } from './create-edit-game/create-game/create-image-logo/create-image-logo.component';
import { CreateTheloaiComponent } from './create-edit-game/create-game/create-theloai/create-theloai.component';
import { GameDownloadComponent } from './game-download/game-download.component';
import { GameLikeComponent } from './game-like/game-like.component';
import { OtherComponent } from './other/other.component';
import { TheloaiComponent } from './theloai/theloai.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    DetailGameComponent,
    UserProfileComponent,
    CreateEditGameComponent,
    CreateGameComponent,
    EditGameComponent,
    CreateEditUserComponent,
    CreateUserComponent,
    EditUserComponent,
    EditImageMHComponent,
    EditTheloaiComponent,
    CreateImageLogoComponent,
    CreateTheloaiComponent,
    GameDownloadComponent,
    GameLikeComponent,
    OtherComponent,
    TheloaiComponent,
    TheloaiEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

