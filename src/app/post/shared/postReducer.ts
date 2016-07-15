// counter.ts
import { ActionReducer, Action } from '@ngrx/store';
import { Post, FbService, FacebookApiMethod} from './index';

export const LOAD = 'LOAD';
export const RESET = 'RESET';
export const CLEAR = 'CLEAR';
export const SET = 'SET';

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

        switch (action.type) {
            case LOAD:
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
            case SET:
                Object.assign(state.current, action.payload);
                return state;
            case CLEAR:
                state.current = {};
                return state;
            case RESET:
                return new Post();
            default:
                return state;
        }
    }