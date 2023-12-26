// match.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as NewScoreActions from '../actions/newScore.action';

export const initialState = {};

const _newscoreReducer = createReducer(
  initialState,
  on(NewScoreActions.sendNewScore, (state, { newScore }) => {
    return {
      newScore,
    };
  })
);

export function newscoreReducer(state: any, action: any) {
  return _newscoreReducer(state, action);
}
