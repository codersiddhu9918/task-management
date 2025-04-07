import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,MatOptionModule,BrowserModule,FormsModule],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = { username: '', password: '' }; // Default user object
  errorMessage: string = ''; // To display errors if any
  successMessage: string = ''; // To display success message on profile update

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserProfile(); // Load user profile when component is initialized
  }

  // Load the user profile by calling the API
  loadUserProfile() {
    this.apiService.getUserProfile().subscribe({
      next: (response: User) => {
        this.user = response; // Assuming the API returns a user object
      },
      error: (error) => {
        console.error('Error loading user profile', error);
        this.errorMessage = 'Failed to load user profile. Please try again later.';
      }
    });
  }

  // Update the user profile by calling the API
  updateUserProfile() {
    this.apiService.updateUserProfile(this.user).subscribe({
      next: (response: User) => {
        console.log('Profile updated successfully', response);
        this.successMessage = 'Profile updated successfully!';
      },
      error: (error) => {
        console.error('Error updating user profile', error);
        this.errorMessage = 'Failed to update profile. Please try again later.';
      }
    });
  }
}
