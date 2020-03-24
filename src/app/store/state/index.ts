
import { IUserState } from '../state/user.state';
import { IBlogState } from './blog.state';

export interface IState {
  user: IUserState; 
  blog: IBlogState  
}

export interface IActivity {
  loading?: boolean;
  loaded?: boolean;
  processing?: boolean;
  processed?: boolean;
  message?: string;
  error?: any;
}

