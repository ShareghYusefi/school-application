import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Check if user is logged in when the component initializes
    this.isLoggedIn = this.authService.isLoggedIn();
  }

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
      },
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    // Redirect to the login page or home page after logout
    this.router.navigate(['/home']);
  }
}
