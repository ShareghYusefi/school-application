import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getToken();
  // Clone the request to add the authentication header.
  if (!authToken) {
    // If no token is found, just pass the request through
    return next(req);
  }
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
