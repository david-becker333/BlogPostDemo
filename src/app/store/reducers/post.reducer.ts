import * as fromPosts from '../actions/post.actions';

import { createReducer } from '@ngrx/store';
import { produceOn } from '../immer';
import { startLoading, doneLoading, failedLoading, startProcessing, failedProcessing, doneProcessing } from '../transitions';
import { initialBlogState, IBlogState } from '../state/blog.state';

export const reducer = createReducer(
  initialBlogState,

  // query
  produceOn(fromPosts.getPosts, (draft: IBlogState) => {
    startLoading(draft);
  }),
  produceOn(fromPosts.getPostsSuccess, (draft: IBlogState, { posts }) => {
    draft.posts = posts;
    doneLoading(draft);
  }),
  produceOn(fromPosts.getPostsFailed, (draft: IBlogState) => {
    draft.posts = [];
    failedLoading(draft);
  }),

  // get
  produceOn(fromPosts.getPost, (draft: IBlogState) => {
    startLoading(draft);
  }),
  produceOn(fromPosts.getPostSuccess, (draft: IBlogState, { post }) => {
    draft.selectedPost = post;
    doneLoading(draft);
  }),
  produceOn(fromPosts.getPostFailed, (draft: IBlogState) => {
    draft.selectedPost = null;
    failedLoading(draft);
  }),

  // create 
  produceOn(fromPosts.createPost, (draft: IBlogState, { post }) => {
    startProcessing(draft);
  }),
  produceOn(fromPosts.createPostSuccess, (draft: IBlogState, { post }) => {
    draft.counter++;
    post.id = draft.counter;
    draft.posts.unshift(post);
    doneProcessing(draft);
  }),
  produceOn(fromPosts.createPostFailed, (draft: IBlogState, { error }) => {
    draft.error = error
    failedProcessing(draft);
  }),

  // update
  produceOn(fromPosts.updatePost, (draft: IBlogState, { post }) => {
    startProcessing(draft);
  }),
  produceOn(fromPosts.updatePostSuccess, (draft: IBlogState, { post }) => {
    draft.posts.forEach(p => {
      if(p.id === post.id) {
        Object.assign(p, post);
      }
    }) 
    doneProcessing(draft);
  }),
  produceOn(fromPosts.updatePostFailed, (draft: IBlogState, { error }) => {
    draft.error = error
    failedProcessing(draft);
  }),

  // delete
  produceOn(fromPosts.deletePost, (draft: IBlogState, { id }) => {
    startProcessing(draft);
  }),
  produceOn(fromPosts.deletePostSuccess, (draft: IBlogState, { id }) => {
    // const index = draft.posts.findIndex(p => p.id === id) 
    // delete draft.posts[index];
    draft.posts = draft.posts.filter(p => p.id !== id) 
    doneProcessing(draft);
  }),
  produceOn(fromPosts.deletePostFailed, (draft: IBlogState, { error }) => {
    draft.error = error
    failedProcessing(draft);
  }),

  
);

