import { ActionReducer, Action } from '@ngrx/store';

export const FAVOR_LOAD = "FAVOR_LOAD";
let INITAL_STATE = [];

export const FavorReducer: ActionReducer<any>
  = (state = INITAL_STATE, action: Action) => {
    console.log('favor:', action);
    switch (action.type) {
      case FAVOR_LOAD:
        return [...action.payload];
      default:
        return state;
    }
  }
