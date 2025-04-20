import { Component, Input, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,MatOptionModule,CommonModule,FormsModule,MatInputModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {username:'', password:''};
  errorMessage: string = '';
  successMessage : string = '';
  message: string = "";

  constructor ( private apiService: ApiService){


  }
  register(registerForm : NgForm) {
    if (registerForm.valid) {
      this.apiService.registerUser(this.user).subscribe({
        next: response => {

          this.successMessage = "user registered successfully";
          this.errorMessage =  "";
          // Optionally, you can redirect the user after successful registration
        },
        error: error => {
          console.error('Registration error', error);

          this.errorMessage = 'User already exists';
          this.successMessage=""; // Set error message
        },
        // complete: () => {
        //   console.log('Registration process completed');
        // }
      });

    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
