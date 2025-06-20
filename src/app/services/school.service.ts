import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../student';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  // schoolUrl = 'https://sequelize-api-1cur.onrender.com';
  schoolUrl = environment.apiUrl;

  // We can use HttpClient once provideHttpClient is imported in app.module.ts
  constructor(private httpClientInstance: HttpClient) {}

  // get students from sequelize API server
  // we want an Observable object that will return an array of students
  getStudents(): Observable<Student[]> {
    // we can use < > to specify the type of data we expect to get back from the API
    return this.httpClientInstance.get<Student[]>(this.schoolUrl + '/students');
  }

  // get student by id
  getStudent(id: number): Observable<Student> {
    return this.httpClientInstance.get<Student>(
      this.schoolUrl + '/students/' + id
    );
  }

  // add student
  addStudent(student: Student | FormData): Observable<Student> {
    return this.httpClientInstance.post<Student>(
      this.schoolUrl + '/students',
      student
    );
  }

  // update student data
  updateStudent(
    id: number,
    updatedStudent: Student | FormData
  ): Observable<Student> {
    return this.httpClientInstance.patch<Student>(
      this.schoolUrl + '/students/' + id,
      updatedStudent
    );
  }

  // delete student by id
  deleteStudent(id: number): Observable<Student> {
    return this.httpClientInstance.delete<Student>(
      this.schoolUrl + '/students/' + id
    );
  }
}
