import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card, [appCard]',
  template: `
    <ng-container>
      <ng-content select="card-header, [cardHeader]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="card-footer, [cardFooter]"></ng-content>
    </ng-container>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {}
