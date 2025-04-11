import { Component } from '@angular/core';
import { Student } from '../../student';
import { SchoolService } from '../../school.service';

@Component({
  selector: 'students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  // define students array for initialization in ngOnInit lifecycle hook
  students: Student[] = [];

  constructor(private schoolService: SchoolService) {}

  // use ngOnInit to get students from schoolService
  ngOnInit() {
    // Since getStudents() returns an Observable, we need to subscribe to it to get the data
    this.schoolService.getStudents().subscribe((response) => {
      this.students = response; // assign the response to students array
      // update undergrad students array
      this.undergradStudents = this.getUndergradStudents();
    });
  }

  getUndergradStudents() {
    return this.students.filter((student) => student.level === 'undergrad');
  }

  // get array of undergrad students
  undergradStudents = this.getUndergradStudents();

  deleteStudent(id: number) {
    // find index of student with given id
    let index = this.students.findIndex((student) => student.id === id);
    // index is -1 when no matching student is found
    if (index === -1) {
      return; // exit function if no matching student is found
    }

    // found student, remove it from the array
    this.students.splice(index, 1);

    // update undergrad students array
    this.undergradStudents = this.getUndergradStudents();
  }
}
