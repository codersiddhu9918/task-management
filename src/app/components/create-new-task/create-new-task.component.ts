import { Component, NgModule } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { Task, TaskCategory, TaskPriority } from '../../models/task.model';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-new-task',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatGridListModule,CommonModule,MatFormFieldModule,FormsModule,MatOptionModule,MatInputModule],
  templateUrl: './create-new-task.component.html',
  styleUrl: './create-new-task.component.css'
})
export class CreateNewTaskComponent {
  newTask: Task = {
    title: '',
    category: TaskCategory.PERSONAL,
    description: '',
    priority: TaskPriority.HIGH,
    user: { id: 0 }  // Notice that 'user' is now an object with an 'id' field
  };

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Retrieve userId from AuthService when the component is initialized
    const userId = this.authService.getUserId();
    if (userId !== null && userId !== undefined) {
      this.newTask.user.id = userId; // Set the user ID inside the user object
    } else {
      console.error('User ID is not available');
    }
  }

  onSubmit(): void {
    console.log('New task:', this.newTask);
    this.apiService.createTask(this.newTask).subscribe(
      () => {
        console.log('Task created successfully:', this.newTask);
        this.router.navigate(['/tasks']); // Navigate back to the task list after adding a new task
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  logout(){
    this.router.navigate(['/logout']);
  }

}
