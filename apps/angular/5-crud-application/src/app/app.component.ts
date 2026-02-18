import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoComponent } from './component/toDo.component';
import { ToDo } from './model/toDo.model';
import { ToDoAction, TodoApiAction } from './state/toDo.actions';

@Component({
  imports: [TodoComponent],
  selector: 'app-root',
  template: `
    <app-todo
      (emitDelete)="delete($event)"
      (emitEdit)="edit()"
      (emitStatus)="changeStatus($event)"></app-todo>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(TodoApiAction.loadItems());
  }

  edit() {
    console.log('@@edit');
  }

  delete(id: number) {
    this.store.dispatch(ToDoAction.deleteTodo({ todoId: id }));
  }

  changeStatus(item: ToDo) {
    this.store.dispatch(
      ToDoAction.updateStatusTodo({
        todoId: item.id,
        completed: !item.completed,
      }),
    );
  }
}
