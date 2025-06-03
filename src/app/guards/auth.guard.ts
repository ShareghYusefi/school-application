import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getToken();
  // If no token is found, redirect to the login page
  if (!authToken) {
    // Redirect to the login page
    inject(Router).navigate(['/login']);
    return false;
  }
  // If a token is found, allow access to the route
  return true;
};
