import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardFooterComponent } from '../../ui/card/card-footer.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [style.background-color]="'rgba(0, 250, 0, 0.1)'">
      <card-header>
        <img
          ngSrc="assets/img/student.webp"
          priority
          width="200"
          height="200"
          alt="" />
      </card-header>
      <card-footer class="flex justify-end">
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewItem()">
          Add
        </button>
      </card-footer>
      @for (item of students(); track item) {
        <app-list-item>
          {{ item.firstName }}
          <button (click)="delete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      }
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardHeaderComponent,
    CardFooterComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
