import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromUser from '../actions/user.actions';
import { IUser } from '../../shared/model/user.model';
import { UserService } from '../../core/user/user.service';


@Injectable()
export class UserEffects {

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType(fromUser.getUsers),
    switchMap((action) => {
      return this.userService.query(action.query).pipe(
        map((users: IUser[]) => {
          return fromUser.getUsersSuccess(users);
        }),
        catchError(error => of(fromUser.getUsersFailed(error)))
      );
    })
  );

  constructor(
    private userService: UserService,
    private actions$: Actions  ) {}
}
