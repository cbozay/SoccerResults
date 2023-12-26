import { createAction, props } from '@ngrx/store';

export const sendNewScore = createAction(
  '[NewScore] Update',
  props<{ newScore: any }>()
);
