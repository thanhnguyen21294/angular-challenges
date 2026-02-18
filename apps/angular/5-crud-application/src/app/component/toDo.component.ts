import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ToDo } from '../model/toDo.model';
import { selectLoading, selectToDoData } from '../state/toDo.selector';

@Component({
  selector: 'app-todo',
  template: `
    <div class="card">
      @for (todo of items$ | async; track todo.id) {
        <div class="card-item d-flex justify-content-between">
          <span>{{ todo.title }}</span>
          <span>{{ todo.completed }}</span>
          <div class="d-flex gap-local-4">
            <button
              (click)="emitStatus.emit(todo)"
              [disabled]="loading$ | async">
              Change status
            </button>
            <button (click)="emitEdit.emit()" [disabled]="loading$ | async">
              Edit
            </button>
            <button
              (click)="emitDelete.emit(todo.id)"
              [disabled]="loading$ | async">
              Delete
            </button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [AsyncPipe],
})
export class TodoComponent {
  private store = inject(Store);
  items$ = this.store.select(selectToDoData);
  loading$ = this.store.select(selectLoading);
  emitEdit = output<void>();
  emitDelete = output<number>();
  emitStatus = output<ToDo>();
}
