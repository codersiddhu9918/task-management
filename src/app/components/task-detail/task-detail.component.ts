import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TaskCategory, TaskPriority } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule // Include RouterModule here
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number = 0;
  taskCategories: string[] = Object.values(TaskCategory);
  taskPriorities: string[] = Object.values(TaskPriority);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      user: this.fb.group({
        id: [0, Validators.required], // User's ID
      })
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.taskId = Number(idParam);
      if (this.taskId > 0) {
        this.loadTask();
      }
    } else {
      console.error('Task ID is required');
      this.router.navigate(['/tasks']);
    }
  }

  loadTask(): void {
    this.apiService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        if (task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority
          });
          console.log('Form after patch:', this.taskForm.value);  // Debugging log to check form values
        } else {
          console.error('Task not found');
        }
      },
      error: (error) => {
        console.error('Error loading task', error);
        this.router.navigate(['/tasks']);
      }
    });
  }

  updateTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      const userId = this.authService.getUserId();
      if (userId !== null && userId !== undefined) {
        taskData.user.id = userId; // Ensure the user ID is added to task data
      } else {
        console.error('User  ID is not available');
        return; // Prevent the save if userId is missing
      }
      this.apiService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          console.log('Task updated successfully');
          this.router.navigate(['/tasks']); // Redirect to tasks list after updating
        },
        error: (err) => {
          console.error('Error updating task', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
