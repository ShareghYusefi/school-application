import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      // next is the success callback
      next: (response) => {
        // Store the JWT token in localStorage within the browser
        localStorage.setItem('jwt_token', response.token);
        this.isLoggedIn = true;
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

}
