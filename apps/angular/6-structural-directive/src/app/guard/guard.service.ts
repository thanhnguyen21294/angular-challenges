import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserStore } from '../user.store';

@Injectable({
  providedIn: 'root',
})
export class AppGuardService {
  private userStore = inject(UserStore);

  isAllowed(role: string[]) {
    const roles = Array.isArray(role) ? role : [role];

    return this.userStore.user$.pipe(
      map((user) => {
        if (!user) return false;

        // admin có quyền tất cả
        if (user.isAdmin) return true;

        // check role
        return user.roles?.some((r) => roles.includes(r));
      }),
    );
  }
}
