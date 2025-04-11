import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  // We can use HttpClient once provideHttpClient is imported in app.module.ts
  constructor(private httpClientInstance: HttpClient) {}

  // get students from sequelize API server
  // we want an Observable object that will return an array of students
  getStudents(): Observable<Student[]>{
    // we can use < > to specify the type of data we expect to get back from the API
    return this.httpClientInstance.get<Student[]>("http://localhost:3000/students")
  }
}
