import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm: FormGroup;

  // We can use a FormBuilder instance via dependency injection to create a form group
  constructor(
    private formBuilderInstance: FormBuilder,
    private authService: AuthService
  ) {
    // Create a form group with two form controls: name and name
    this.loginForm = this.formBuilderInstance.group({
      // We can use Validators to specify validation rules for each form control
      id: [''],
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      password: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  // getters
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // onSubmit function
  onSubmit() {
    if (this.loginForm.valid) {
      // Call the login method from AuthService
      this.authService
        .login(this.email?.value, this.password?.value)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            // Store the JWT token in localStorage within the browser
            localStorage.setItem('jwt_token', response.token);
            console.log('Login successful');
          },
          error: (error) => {
            console.error('Login failed', error);
          },
        });
    }
  }
}
