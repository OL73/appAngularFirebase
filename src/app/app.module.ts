import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';

import {  Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes: Routes = [
  { path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent },
  { path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent },
  { path: 'not-found', component: FourOFourComponent },
  { path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponent },
  { path: 'users', component: UserListComponent },
  { path: 'new-users', component: NewUserComponent },
  { path: '**', redirectTo: '/not-found' } // ATTENTION : redirection 'erreur 404' à placer à la fin de toutes les routes
];

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // permet de créer les formulaires avec la méthode réactive
    HttpClientModule, // permet d'accéder à la base de donnée Firebase
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    AppareilService,
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
