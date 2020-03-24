import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from './store/state';
import { getUsers } from './store/actions/user.actions';
import { getPosts } from './store/actions/post.actions';

@Injectable({ providedIn: 'root'})
export class AppInitializerService {

    constructor(private store: Store<IState>) { }

    initializeUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            // we don't need query params so we'll send empty query
            this.store.dispatch(getUsers({}));
            resolve();
        });
    }

    initializePosts(): Promise<any> {
        return new Promise((resolve, reject) => {
            // we don't need query params so we'll send empty query
            this.store.dispatch(getPosts({}));
            resolve();
        });
    }
}