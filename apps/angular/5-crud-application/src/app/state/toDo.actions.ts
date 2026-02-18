import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ToDo } from '../model/toDo.model';

export const ToDoAction = createActionGroup({
  source: 'Action',
  events: {
    'Get List Todo': emptyProps(),

    'Add Todo': props<{ todo: ToDo }>(),
    'Remove Todo': props<{ todoId: number }>(),

    'Update Status Todo': props<{ todoId: number; completed: boolean }>(),
    'Update Status Todo Success': props<{ todo: ToDo }>(),
    'Update Status Todo Error': props<{ error: string }>(),

    'Delete Todo': props<{ todoId: number }>(),
    'Delete Todo Success': props<{ todoId: number }>(),
    'Delete Todo Error': props<{ error: string }>(),
  },
});

export const TodoApiAction = createActionGroup({
  source: 'API call',
  events: {
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: ToDo[] }>(),
    'Load Items Failed': props<{ error: string }>(),
  },
});
