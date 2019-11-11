import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  onAuth: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.onAuth = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        this.onAuth = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.onAuth = this.authService.isAuth;
    console.log(this.onAuth);
  }

}
