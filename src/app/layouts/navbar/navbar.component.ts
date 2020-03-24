import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/login/login.service';
import { AccountService } from '../../core/auth/account.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private title: Title
  ) {
  }

  ngOnInit() {
  }

  get pageTitle() {
    return this.title.getTitle();
  }


  get authenticated() {
    return this.accountService.isLoggedIn;
  }

  get loggedUser() {
    return this.accountService.loggedUser;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
