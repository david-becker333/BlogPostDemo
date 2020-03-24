import * as fromUser from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { produceOn } from '../immer';
import { initialUserState, IUserState } from '../state/user.state';
import { startLoading, doneLoading, failedLoading } from '../transitions';

export const reducer = createReducer(
  initialUserState,
  produceOn(fromUser.getUsers, (draft, { query }) => {
    startLoading(draft);
  }),
  produceOn(fromUser.getUsersSuccess, (draft, { users }) => {
    draft.users = users;
    doneLoading(draft);
  }),
  produceOn(fromUser.getUsersFailed, (draft, { error }) => {
    draft.error = error;
    failedLoading(draft);
  })
);

