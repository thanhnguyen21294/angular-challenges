import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-header, [cardHeader]',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {}
