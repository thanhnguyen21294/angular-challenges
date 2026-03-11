import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  imports: [],
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  testId = input.required<string | undefined>();
  user = input.required<string | undefined>();
  permission = input.required<string | undefined>();
}
