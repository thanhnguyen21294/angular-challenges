import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-footer, [cardFooter]',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {}
