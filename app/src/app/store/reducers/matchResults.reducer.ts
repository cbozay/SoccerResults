import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/matchResults.actions';

export const initialState: any[] = [];

const _matchResultsReducer = createReducer(
  initialState,
  on(actions.sendMatchResults, (state, { results }) => [...results])
);

export function matchResultsReducer(state: any, action: any) {
  return _matchResultsReducer(state, action);
}
