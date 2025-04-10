import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  students = [
    {
      id: 1,
      name: 'John Doe',
      level: 'undergrad',
    },
    {
      id: 2,
      name: 'Jane Smith',
      level: 'postgrad',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      level: 'undergrad',
    },
    {
      id: 4,
      name: 'Bob Brown',
      level: 'postgrad',
    },
    {
      id: 5,
      name: 'Charlie Black',
      level: 'undergrad',
    },
  ];

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
