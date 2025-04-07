import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { loadTasksFailure, loadTasksSuccess } from './actions';

export interface TaskState {
  tasks: Task[];
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(loadTasksFailure, (state, { error }) => ({ ...state, error }))
);
