import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  template: `
    <p>I'm a placeholder component.</p>
  `,
  styles: `
    :host {
      display: grid;
      padding: 20px;
      background-color: #f0f0f0;
      height: 50%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PlaceholderComponent {}
