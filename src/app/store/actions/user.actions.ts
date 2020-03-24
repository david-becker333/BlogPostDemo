import { createAction, props, union } from '@ngrx/store';

export const getUsers = createAction(
  '[User] getUsers',
  (query) => ({query}),
)

export const getUsersSuccess = createAction(
  '[User] getUsersSuccess',
  (users) => ({users})
)

export const getUsersFailed = createAction(
  '[User] getUsersFailed',
  (error: any) => ({error})
)
