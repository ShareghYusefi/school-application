import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { UndergradsComponent } from './components/undergrads/undergrads.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    UndergradsComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    ReactiveFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  // HttpClientModule is imported here to make HTTP requests and provideHttpClient is used to provide the HttpClient service
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
