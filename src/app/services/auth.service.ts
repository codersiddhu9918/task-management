import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/';
  private token!: string;

  constructor(private http: HttpClient, private router : Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}users/login`, { username, password });
  }

  setUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
    console.log('User ID saved:', userId);  // Debug log to verify userId is being saved
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.token = '';
    localStorage.removeItem('tokenExpiration');  // Optionally remove the token expiration
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    console.log("user id fetched ", userId);
    return userId ? parseInt(userId, 10) : null;  // Return as number or null
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      console.error('Token is missing or invalid');
      return throwError('Token is missing or invalid'); // Return an error if token is missing
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.get(`${this.baseUrl}users/me`, { headers });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
