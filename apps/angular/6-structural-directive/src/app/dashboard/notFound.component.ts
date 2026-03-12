import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-notfound-dashboard',
  imports: [ButtonComponent, RouterLink],
  template: `
    <p>Not found Dashboard</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundDashboardComponent {}
