import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/interfaces/team';

export const sendChampionshipProbabilities = createAction(
  '[ChampionshipProbabilities] Update',
  props<{ championshipProbabilities: { team: Team; probability: number }[] }>()
);
