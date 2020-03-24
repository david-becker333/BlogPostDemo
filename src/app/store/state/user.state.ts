import { IUser } from '../../shared/model/user.model';
import { IActivity, IState } from '.';
import { createSelector } from '@ngrx/store';


export interface IUserState extends IActivity {
  users: IUser[];
}

export const INITIAL_STATE: IUserState = {
  users: []
};

export const initialUserState: IUserState = {
  ...INITIAL_STATE
};


/* selectors */
export const selectFeature = (state: IState) => state.user;

export const selectUsers = createSelector(
    selectFeature,
    (state: IUserState) => state.users
);

export const selectUser = login => createSelector(
  selectFeature,
  (state: IUserState) => state.users.find((user) => user.username === login)
);

export const isUsersLoading = createSelector(
  selectFeature,
  (state: IUserState) => state.loading
);

export const isUsersLoaded = createSelector(
  selectFeature,
  (state: IUserState) => state.loaded
);
