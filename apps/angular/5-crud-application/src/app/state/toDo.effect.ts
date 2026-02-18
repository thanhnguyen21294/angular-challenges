import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TodoService } from '../toDo.service';
import { ToDoAction, TodoApiAction } from './toDo.actions';

@Injectable({
  providedIn: 'root',
})
export class TodoEffect {
  private actions$ = inject(Actions);
  private itemsService = inject(TodoService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoApiAction.loadItems),
      switchMap(() =>
        this.itemsService.getTodo().pipe(
          map((items) => TodoApiAction.loadItemsSuccess({ items: items })),
          catchError((err) =>
            of(TodoApiAction.loadItemsFailed(err ?? 'FAILED')),
          ),
        ),
      ),
    ),
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToDoAction.updateStatusTodo),
      switchMap(({ todoId, completed }) =>
        this.itemsService
          .updateTodo(todoId, completed)
          .pipe(map((todo) => ToDoAction.updateStatusTodoSuccess({ todo }))),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToDoAction.deleteTodo),
      switchMap(({ todoId }) =>
        this.itemsService
          .deleteTodo(todoId)
          .pipe(map((id) => ToDoAction.deleteTodoSuccess({ todoId: id }))),
      ),
    ),
  );
}
