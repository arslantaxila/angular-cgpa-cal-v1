import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { ShellComponent } from './shared/shell/shell.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { RightsGuard } from './auth/services/rights-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
      loadChildren: () => UserModule,
        canActivate: [RightsGuard],
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
