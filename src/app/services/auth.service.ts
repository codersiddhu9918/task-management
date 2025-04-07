import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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


  // setUserId(userId: number): void {
  //   localStorage.setItem('userId', userId.toString()); // Store userId as string
  // }

  setUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
    console.log('User ID saved:', userId);  // Debug log to verify userId is being saved
  }

  // Get the userId from localStorage
  // getUserId(): number | null {
  //   const userId = localStorage.getItem('userId');
  //   return userId ? parseInt(userId, 10) : null; // Return userId as a number
  // }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    console.log('User ID retrieved:', userId);  // Debug log to verify it's being retrieved
    return userId ? parseInt(userId, 10) : null;  // Return as number or null
  }

  // logout(): void {
  //   // Clear any authentication data (tokens, etc.)
  //   localStorage.removeItem('authToken');
  //   sessionStorage.removeItem('authToken');


  //   // Redirect to the login page
  //   this.router.navigate(['/login']);
  // }

  // Check if the user is authenticated
  logout(): void {
    localStorage.removeItem('userId');
    console.log('User logged out');  // Debug log
    this.router.navigate(['/login']);  // Redirect to login page
  }

  // Check if the user is authenticated (i.e., UserId exists)
  isAuthenticated(): boolean {
    return this.getUserId() !== null;
  }

  // getCurrentUserId():userid{
  //   return localStorage.getItem('userId') || '';
  // }


  // setToken(token: string) {
  //   this.token = token;
  //   localStorage.setItem('jwt', token);
  // }

  // getToken() {
  //   return this.token || localStorage.getItem('jwt');
  // }

  // isAuthenticated(): boolean {
  //   return !!this.getToken();
  // }
}
