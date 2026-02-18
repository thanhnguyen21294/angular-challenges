import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../model/toDo.model';
import { ToDoAction, TodoApiAction } from './toDo.actions';

export const initialTodoState: TodoState = {
  items: [],
  loading: false,
  error: '',
};

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoApiAction.loadItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoApiAction.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items: items,
    loading: false,
  })),
  on(TodoApiAction.loadItemsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ToDoAction.updateStatusTodo, (state, { todoId, completed }) => ({
    ...state,
    loading: true,
    items: state.items.map((item) =>
      item.id === todoId ? { ...item, completed } : item,
    ),
  })),
  on(ToDoAction.updateStatusTodoSuccess, (state, { todo }) => ({
    ...state,
    loading: false,
    items: state.items.map((item) => (item.id === todo.id ? todo : item)),
  })),

  on(ToDoAction.deleteTodo, (state) => ({
    ...state,
    loading: true,
  })),

  on(ToDoAction.deleteTodoSuccess, (state, { todoId }) => ({
    ...state,
    loading: false,
    items: state.items.filter((item) => item.id !== todoId),
  })),
);
