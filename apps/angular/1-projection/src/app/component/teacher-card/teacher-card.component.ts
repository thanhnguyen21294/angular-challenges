import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardFooterComponent } from '../../ui/card/card-footer.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [style.background-color]="'rgba(250, 0, 0, 0.1)'">
      <card-header>
        <img
          ngSrc="assets/img/teacher.png"
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
      @for (item of teachers(); track item) {
        <app-list-item>
          {{ item.firstName }}
          <button (click)="delete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" alt="" />
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
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
