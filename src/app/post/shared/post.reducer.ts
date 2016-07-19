// counter.ts
import { ActionReducer, Action } from '@ngrx/store';
import { Post, FbService, FacebookApiMethod} from './index';

export const POST_LOAD = 'POST_LOAD';
export const POST_RESET = 'POST_RESET';
export const POST_CLEAR = 'POST_CLEAR';
export const POST_SET = 'POST_SET';

let INITAL_STATE: Post = new Post();

export const postReducer: ActionReducer<Post>
  = (state: Post = INITAL_STATE, action: Action) => {
    function isExist(id) {
      for (let i = 0; i < state.Posts.length; i++) {
        if (state.Posts[i].id == id) {
          return true;
        }
      }
      return false;
    }
    console.log('post:', action);
    switch (action.type) {
      case POST_LOAD:
        let ar = [];
        let newstate: Post = new Post();
        action.payload.posts.forEach(element => {
          if (isExist(element.id) == false) {
            ar.push(element);
          }
        });
        newstate.Posts = [...state.Posts,
          ...ar];
        newstate.paging = Object.assign({}, action.payload.paging);
        return newstate;
      case POST_SET:
        if (action.payload)
          Object.assign(state.current, action.payload);
        return state;
      case POST_CLEAR:
        state.current = {};
        return state;
      case POST_RESET:
        return new Post();
      default:
        return state;
    }
  }
