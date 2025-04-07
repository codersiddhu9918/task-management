import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl:String= "http://localhost:8082/api/";

  constructor(private http: HttpClient) { }

  registerUser(user : User ) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}users/register`, user);
  }

  getTasks( userId : number ) : Observable<Task[]>{
    return this.http.get<Task[]> (`${this.baseUrl}tasks/${userId}`);
  }

  createTask(task : Task) : Observable <Task>{
    return this.http.post<Task> (`${this.baseUrl}tasks`,task);
  }

  updateTask(id: number, task : Task): Observable <Task> {
    return this.http.put<Task> (`${this.baseUrl}tasks/${id}`, task);
  }

  deleteTask(id:number) : Observable <void> {
    return this.http.delete<void> (`${this.baseUrl}tasks/${id}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}tasks/task/${id}`);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}user/profile`);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}user/profile`, user);
  }
}
