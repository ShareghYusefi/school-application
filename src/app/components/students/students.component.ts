import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
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

  // get array of undergrad students
  undergradStudents = this.students.filter(student => student.level === 'undergrad');

}
