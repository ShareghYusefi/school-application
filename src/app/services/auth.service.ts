import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Adjust port if needed

  constructor(private http: HttpClient) { }

  // Login: send credentials, store JWT on success
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Logout: remove JWT from localStorage
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Check if JWT token exists
  hasToken(): boolean {
    return !!this.getToken();
  }

  // Check if user is logged in (token exists and is not expired)
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = this.decodePayload(token);
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
  }

  // Helper to decode JWT payload
  private decodePayload(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}