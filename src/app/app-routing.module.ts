import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'students/:id',
    component: ReactiveFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard], // Add your auth guard here if needed
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  // login route
  {
    path: 'login',
    component: LoginFormComponent,
  },
  // register route
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
