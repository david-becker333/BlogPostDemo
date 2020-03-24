import { createAction } from '@ngrx/store';
import { IPost } from '../../shared/model/blog.model';

// query
export const getPosts = createAction(
  '[Posts] getPosts',
  (query: any) => ({ query })
)

export const getPostsSuccess = createAction(
  '[Posts] getPostsSuccess',
  (posts: IPost[]) => ({ posts })
)

export const getPostsFailed = createAction(
  '[Posts] getPostsFailed',
  (error: any) => ({ error })
)

// create
export const createPost = createAction(
  '[Posts] createPost',
  (post: IPost) => ({ post })
)

export const createPostSuccess = createAction(
  '[Posts] createPostSuccess',
  (post: IPost) => ({ post })
)

export const createPostFailed = createAction(
  '[Posts] createPostFailed',
  (error: any) => ({ error })
)

// update 
export const updatePost = createAction(
  '[Posts] updatePost',
  (post: IPost) => ({ post })
)

export const updatePostSuccess = createAction(
  '[Posts] updatePostSuccess',
  (post: IPost) => ({ post })
)

export const updatePostFailed = createAction(
  '[Posts] updatePostFailed',
  (error: any) => ({ error })
)

// delete
export const deletePost = createAction(
  '[Posts] deletePost',
  (id: number) => ({ id })
)

export const deletePostSuccess = createAction(
  '[Posts] deletePostSuccess',
  (id: number) => ({ id })
)

export const deletePostFailed = createAction(
  '[Posts] deletePostFailed',
  (error: any) => ({ error })
)

// get
export const getPost = createAction(
  '[Posts] getPost',
  (id: number) => ({ id })
)

export const getPostSuccess = createAction(
  '[Posts] getPostSuccess',
  (post: IPost) => ({ post })
)

export const getPostFailed = createAction(
  '[Posts] getPostFailed',
  (error: any) => ({ error })
)
