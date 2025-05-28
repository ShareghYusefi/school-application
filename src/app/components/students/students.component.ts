import { Component } from '@angular/core';
import { Student } from '../../student';
import { SchoolService } from '../../services/school.service';

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
    // call deleteStudent method from schoolService to delete student by id
    this.schoolService.deleteStudent(id).subscribe(
      (response: Student) => {
        // find student in students array using id field
        let student = this.students.find((s) => s.id === response.id);
        // if student is not found, return
        if (!student) return;

        // remove student from students array using splice method
        this.students.splice(this.students.indexOf(student), 1);
        // update undergrad students array
        this.undergradStudents = this.getUndergradStudents();
      },
      (error) => {
        console.log('Error deleting student:', error);
      }
    );
  }
}
