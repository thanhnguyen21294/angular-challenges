import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective } from './directives/hasRole.directive';
import { HasRoleSuperAdminDirective } from './directives/hasRoleSuperAdmin.directive';

@Component({
  selector: 'app-information',
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleSuperAdmin>visible only for super admin</div>
    <div *hasRole="'MANAGER'">visible if manager</div>
    <div *hasRole="['MANAGER', 'READER']">visible if manager and/or reader</div>
    <div *hasRole="['MANAGER', 'WRITER']">visible if manager and/or writer</div>
    <div *hasRole="'CLIENT'">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HasRoleDirective, HasRoleSuperAdminDirective],
})
export class InformationComponent {}
