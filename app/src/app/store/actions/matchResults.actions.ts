import { createAction, props } from '@ngrx/store';

export const sendMatchResults = createAction(
  '[MatchResults] Update',
  props<{ results: any[] }>()
);
