import { IPost, IBlogPost, IQuery } from 'src/app/shared/model/blog.model';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IState, IActivity } from '.';

export interface IBlogState extends IActivity {
  posts?: IPost[],
  counter?: number,
  selectedPost?: IPost
}
const INITIAL_STATE = {
  posts: [],
  counter: 1000,
  selectedPost: null
};

export const initialBlogState: IBlogState = {
  ...INITIAL_STATE
};


/* selectors */
export const selectFeature = (state: IState) => state.blog;

export const selectUserAsMap = (state: IState) => {
  return state.user.users.reduce((mapped, user) => {
    mapped[user.id] = user;
    return mapped;
  }, {});
};

export const selectPosts = createSelector(
  (state: IState) => state,
  (state: IState) => {
    const userMap = state.user.users.reduce((mapped, user) => {
      mapped[user.id] = user;
      return mapped;
    }, {});
    return state.blog.posts.map(post => {
      return {
        post,
        userinfo: userMap[post.userId]
      }
    })
  }
);

export const selectCurrentPost = createSelector(
  selectFeature,
  (state: IBlogState) => state.selectedPost
);

export const selectPostsByQuery = (query: IQuery) => createSelector(
  (state: IState) => state,
  (state: IState) => {
    const userMap = mapUsers(state);
    const { page, itemsPerPage } = query;
    const offset = (page - 1) * itemsPerPage;
    const pageItems: IPost[] = state.blog.posts.slice(offset, offset + itemsPerPage)
    const blogposts = pageItems.map(post => {
      return {
        post,
        userinfo: userMap[post.userId]
      }
    });
    // simulate a server call response
    return {
      data: blogposts,
      meta: {
        totalRecords: state.blog.posts.length
      }
    }
  }
);

export const selectPost = id => createSelector(
  selectFeature,
  (state: IBlogState) => state.posts.find((post) => post.id == id)
);

export const isLoading = createSelector(
  selectFeature,
  (state: IBlogState) => state.loading
);

export const isLoaded = createSelector(
  selectFeature,
  (state: IBlogState) => state.loaded
);

export const isProcessing = createSelector(
  selectFeature,
  (state: IBlogState) => state.processing
);

export const isProcessed = createSelector(
  selectFeature,
  (state: IBlogState) => state.processed
);

export const mapUsers = state => {
  const userMap = state.user.users.reduce((mapped, user) => {
    mapped[user.id] = user;
    return mapped;
  }, {});
  return userMap;
}
