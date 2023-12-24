import { createAction, props } from '@ngrx/store';

export const sendAllMatchResults = createAction(
  '[AllMatchResults] Add',
  props<{ results: any[] }>()
);
