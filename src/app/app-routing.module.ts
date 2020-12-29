import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
      },
      {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
      }],
    canActivate: [AuthGuard]
  },
  {
    path: 'public',
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'new-user',
        loadChildren: () => import('./pages/new-user/new-user.module').then(m => m.NewUserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
