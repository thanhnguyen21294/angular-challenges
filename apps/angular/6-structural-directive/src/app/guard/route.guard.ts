import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AppGuardService } from './guard.service';

export function canMatch(role: string[]): CanMatchFn {
  return () => {
    const guardService = inject(AppGuardService);
    return guardService.isAllowed(role);
  };
}
