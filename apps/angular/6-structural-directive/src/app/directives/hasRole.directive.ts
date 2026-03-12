import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TypedTemplate } from '../shared';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<TypedTemplate<Role>>);
  private viewContainer = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  hasRole = input.required<Role | Role[]>();

  private user = toSignal(this.userStore.user$);

  private hasView = false;

  constructor() {
    effect(() => {
      const user = this.user();
      const rolesInput = this.hasRole();

      if (!user) {
        this.clear();
        return;
      }

      // ⭐ admin thấy tất cả
      if (user.isAdmin) {
        this.show();
        return;
      }

      const userRoles = user.roles ?? [];
      const required = Array.isArray(rolesInput) ? rolesInput : [rolesInput];

      const allowed = required.some((role) => userRoles.includes(role));

      if (allowed) {
        this.show();
      } else {
        this.clear();
      }
    });
  }

  private show() {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private clear() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
