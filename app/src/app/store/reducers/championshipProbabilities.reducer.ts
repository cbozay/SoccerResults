import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/championshipProbabilities.action';
import { Team } from 'src/app/interfaces/team';

export const initialState: { team: Team; probability: number }[] = [];

const _championshipProbabilitiesReducer = createReducer(
  initialState,
  on(
    actions.sendChampionshipProbabilities,
    (state, { championshipProbabilities }) => [...championshipProbabilities]
  )
);

export function championshipProbabilitiesReducer(state: any, action: any) {
  return _championshipProbabilitiesReducer(state, action);
}
