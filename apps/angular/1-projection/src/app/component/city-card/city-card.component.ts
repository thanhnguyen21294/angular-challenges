import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardFooterComponent } from '../../ui/card/card-footer.component';
import { CardHeaderComponent } from '../../ui/card/card-header.component';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [style.background-color]="'rgba(250, 0, 0, 0.1)'">
      <card-header>
        <img
          ngSrc="assets/img/city.png"
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
      @for (item of cities(); track item) {
        <app-list-item>
          {{ item.name }}
          <button (click)="delete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" alt="" />
          </button>
        </app-list-item>
      }
    </app-card>
  `,
  imports: [
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    ListItemComponent,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit() {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
