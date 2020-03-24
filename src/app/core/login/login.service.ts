import { Injectable } from '@angular/core';

import { AccountService } from '../auth/account.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private accountService: AccountService,
  ) { }

  login(credentials, callback?) {
    const cb = callback || function () { };
    this.accountService.login(credentials, cb);
  }

  logout() {
    this.accountService.logout();
  }
}
