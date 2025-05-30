import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  // subscribe to the isLoggedIn$ observable from AuthService to get the current login state
  // private loginStatusSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to get the current login state
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      // next is the success callback
      next: (response) => {
        console.log('Login successful', response);
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
