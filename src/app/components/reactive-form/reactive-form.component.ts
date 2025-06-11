import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../services/school.service';
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
      id: [''],
      avatar: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
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
              id: student.id,
              name: student.name,
              age: student.age,
              level: student.level,
            });
          },
          (error) => {
            console.log(error);
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

  get age() {
    return this.reactiveForm.get('age');
  }

  get avatar() {
    return this.reactiveForm.get('avatar');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // update reactive form with the file name
      this.reactiveForm.patchValue({
        // we can store the avatar file name in our database
        avatar: file,
      });
      // check the updateValueAndValidity method to update the form control's value and validity
      // this is useful when we want to update the form control's value and validity after changing the value programmatically
      this.avatar?.updateValueAndValidity();
    }
  }

  // handle form submission
  onSubmit() {
    console.log(this.reactiveForm.value);

    // if form is invalid, return
    if (this.reactiveForm.invalid) {
      return;
    }

    // create formData object to allow file upload
    const formData = new FormData();
    // append form values to formData
    // for (const key in this.reactiveForm.value) {
    //   if (this.reactiveForm.value.hasOwnProperty(key)) {
    //     formData.append(key, this.reactiveForm.value[key]);
    //   }
    // }

    formData.append('id', this.reactiveForm.value.id);
    formData.append('name', this.reactiveForm.value.name);
    formData.append('age', this.reactiveForm.value.age);
    formData.append('level', this.reactiveForm.value.level);

    // append the avatar file to formData
    const avatarFile = this.reactiveForm.get('avatar')?.value;
    if (avatarFile && avatarFile instanceof File) {
      formData.append('avatar', avatarFile);
    }

    // check if we have an id in the URL
    let id = this.route.snapshot.paramMap.get('id');
    // if we have an id, we can use it to update the student data
    if (id) {
      // update student data using API
      this.schoolService.updateStudent(parseInt(id), formData).subscribe(
        (student: Student) => {
          console.log('Student updated:', student);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // create new student using API
      this.schoolService.addStudent(formData).subscribe(
        (student: Student) => {
          console.log('Student updated:', student);
          // reset form
          this.reactiveForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
