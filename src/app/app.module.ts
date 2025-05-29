import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { UndergradsComponent } from './components/undergrads/undergrads.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { authInterceptor } from './middlewares/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    UndergradsComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    ReactiveFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  // HttpClientModule is imported here to make HTTP requests and provideHttpClient is used to provide the HttpClient service
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
