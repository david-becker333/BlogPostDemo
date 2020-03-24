import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IState } from '../state';
import { reducer as userReducer } from '../reducers/user.reducer';
import { reducer as postReducer } from '../reducers/post.reducer';
import { environment } from '../../../environments/environment';

export const rootReducers: ActionReducerMap<IState> = {
  user: userReducer,
  blog: postReducer
};

// optional meta reducer for store
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
