import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-user-home',
  template: `
    User Home component
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHomeComponent {}
