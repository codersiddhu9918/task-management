import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { loadTasks, loadTasksFailure, loadTasksSuccess } from './actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(action =>
        this.apiService.getTasks(action.userId).pipe(
          map(tasks => loadTasksSuccess({ tasks })),
          catchError(error => of(loadTasksFailure({ error })))
        )
      )
    )
  );
}
