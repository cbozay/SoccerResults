import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/allMatchResults.action';

export const initialState: any[] = [];

const _allMatchResultsReducer = createReducer(
  initialState,
  on(actions.sendAllMatchResults, (state, { results }) => [...results])
);

export function allMatchResultsReducer(state: any, action: any) {
  return _allMatchResultsReducer(state, action);
}
