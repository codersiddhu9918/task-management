import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService : AuthService){

  }

  ngOnInit() {
    // Call logout method from the AuthService and handle the redirection
    this.authService.logout();
  }

}
