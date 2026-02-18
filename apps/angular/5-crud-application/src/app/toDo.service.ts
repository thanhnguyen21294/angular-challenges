import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToDo } from './model/toDo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/todos';

  getTodo(): Observable<Array<ToDo>> {
    return this.http
      .get<Array<ToDo>>(this.url)
      .pipe(map((todos) => todos ?? []));
  }

  updateTodo(todoId: number, completed: boolean): Observable<ToDo> {
    return this.http
      .patch<ToDo>(`${this.url}/${todoId}`, { completed })
      .pipe(map((todo) => todo ?? 'Lỗi update todo'));
  }

  deleteTodo(todoId: number) {
    return this.http
      .delete(`${this.url}/${todoId}`)
      .pipe(map(() => todoId ?? 'Lỗi xóa todo'));
  }
}
