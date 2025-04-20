import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatGridListModule,NgFor,CommonModule,MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: Task[] = [];
  constructor(private apiservice : ApiService, private router : Router, private authService : AuthService){
  }

  ngOnInit(){
    this.loadTasks();
  }

  loadTasks() {
    const userId = this.authService.getUserId() ?? 0;
    this.apiservice.getTasks(userId).subscribe(tasks => {
      this.tasks = tasks;

    });
  }

  deleteTask(id:any) {
    this.apiservice.deleteTask(id).subscribe(() => {
      // console.log(id);
      this.loadTasks(); // Refresh the task list
    });
  }

  addNewTask(){
    this.router.navigate(['/tasks/new']);
  }

  logout(){
    this.router.navigate(['/logout']);
  }

}
