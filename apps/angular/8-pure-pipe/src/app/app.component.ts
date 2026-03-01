import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppPipe } from './name.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | name: $index }}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
