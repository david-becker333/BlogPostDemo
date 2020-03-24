import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../../store/state';
import { IUser, Credentials } from '../../shared/model/user.model';
import { selectUser } from '../../store/state/user.state';
import { take, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AccountService {

  private identity = {
    user: null,
    loggedIn: false
  };

  constructor(
    private store: Store<IState>) {

  }

  get isLoggedIn(): boolean {
    if (this.identity) {
      return this.identity.loggedIn;
    } else {
      return false;
    }
  }

  get loggedUser(): IUser {
    if (this.identity && this.identity.user) {
      return this.identity.user;
    } else {
      return null;
    }
  }

  login(credentials: Credentials, cb: Function) {

    this.store.select(selectUser(credentials.username)).pipe(
      take(1),
      map(res => {
        if (!res) {
          throw new Error('Invalid username');
        }
        return res;
      })
    ).subscribe(
      user => {
        this.identity.loggedIn = true;
        this.identity.user = user;
        return cb();
      },
      err => {
        return cb(err);
      })
  }

  logout() {

    this.identity.loggedIn = false;
    this.identity.user = null;
  }
}
