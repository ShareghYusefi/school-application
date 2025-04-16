import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../school.service';
import { Student } from '../../student';

@Component({
  selector: 'reactive-form',
  standalone: false,
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;

  // We can use a FormBuilder instance via dependency injection to create a form group
  constructor(
    private formBuilderInstance: FormBuilder,
    private route: ActivatedRoute,
    private schoolService: SchoolService
  ) {
    // Create a form group with two form controls: name and name
    this.reactiveForm = this.formBuilderInstance.group({
      // We can use Validators to specify validation rules for each form control
      name: ['', [Validators.required, Validators.minLength(5)]],
      level: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    // get id of student using paramMap observable
    this.route.paramMap.subscribe((params) => {
      // check if id is present in params
      let id = params.get('id');
      // If id is present, we can use it to get the student data from the API
      if (id) {
        // get student data from API using id
        this.schoolService.getStudent(parseInt(id)).subscribe(
          (student: Student) => {
            // update form with student data
            this.reactiveForm.patchValue({
              name: student.name,
              level: student.level,
            });
          },
          (error) => {
            console.log('Error deleting student:', error);
          }
        );
      }
    });
  }

  // We can use getters to access the form controls in the template
  get name() {
    return this.reactiveForm.get('name');
  }

  get level() {
    return this.reactiveForm.get('level');
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
  }
}
