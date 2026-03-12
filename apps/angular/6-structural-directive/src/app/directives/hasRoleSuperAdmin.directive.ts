import {
  Directive,
  effect,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRoleSuperAdmin]',
  standalone: true,
})
export class HasRoleSuperAdminDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private userStore = inject(UserStore);

  private user = toSignal(this.userStore.user$);

  private hasView = false;

  constructor() {
    effect(() => {
      const user = this.user();

      const isAdmin = user?.isAdmin === true;

      if (isAdmin && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }

      if (!isAdmin && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }
}
