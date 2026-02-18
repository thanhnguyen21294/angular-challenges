import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../model/toDo.model';

export const selectItemState = createFeatureSelector<TodoState>('todos');
// 2. Select just the list from that state
export const selectToDoData = createSelector(
  selectItemState,
  (state: TodoState) => state.items,
);

export const selectLoading = createSelector(
  selectItemState,
  (state: TodoState) => state.loading,
);
