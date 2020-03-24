import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError, delay, flatMap } from 'rxjs/operators';

import * as fromPosts from '../actions/post.actions';
import { PostService } from 'src/app/core/services/post.service';
import { IState } from '../state';
import { IPost, IBlogPost } from 'src/app/shared/model/blog.model';
import { sortByAuthor, sortByNoOfPages, sortByReleaseDate } from '../../shared/utils';

@Injectable()
export class PostEffects {

  @Effect()
  getPosts$ = this.actions$.pipe(
    ofType(fromPosts.getPosts),
    switchMap((action) => {
      return this.postService.query(action.query).pipe(
        map((posts: IPost[]) => {
          return fromPosts.getPostsSuccess(posts);
        }),
        catchError(error => of(fromPosts.getPostsFailed(error)))
      );
    })
  );

  @Effect()
  createPost$ = this.actions$.pipe(
    ofType(fromPosts.createPost),
    switchMap(({post}) => {
      return of(fromPosts.createPostSuccess(post));
    }),
    catchError(error => of(fromPosts.createPostFailed(error)))
  );

  @Effect()
  updatePost$ = this.actions$.pipe(
    ofType(fromPosts.updatePost),
    switchMap(({post}) => {
      return of(fromPosts.updatePostSuccess(post));
    }),
    catchError(error => of(fromPosts.updatePostFailed(error)))
  );

  @Effect()
  deletePost$ = this.actions$.pipe(
    ofType(fromPosts.deletePost),
    switchMap(({id}) => {
      return of(fromPosts.deletePostSuccess(id));
    }),
    catchError(error => of(fromPosts.deletePostFailed(error)))
  );

  constructor(
    private postService: PostService,
    private actions$: Actions) { }
}
