import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[MatFormFieldModule,MatSelectModule,MatOptionModule,CommonModule,FormsModule,MatInputModule,RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:User = {
    username: '',
    password: '',
    id : 0,
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(loginData: NgForm) {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user.username, this.user.password).subscribe({
        next: (response) => {
          this.authService.setUserId(response.id);
          // console.log('Login successful:', response);
          this.user.id  = response.id;
          // localStorage.setItem('authToken', response.token);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password.';
        }
      });
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
}


