import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AuthGuard } from '../auth/services/auth-guard.service';
import {UserComponent} from './pages/user/user.component'
import { TranscriptComponent } from './pages/transcript/transcript.component';
import { GpaComponent } from './pages/gpa/gpa.component';



const routes: Routes = [
  { path: 'home', component: MyProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transcript',
    component: TranscriptComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gpa-calculation',
    component: GpaComponent,
    canActivate: [AuthGuard],
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
