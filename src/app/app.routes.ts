import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateNewTaskComponent } from './components/create-new-task/create-new-task.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: CreateNewTaskComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'logout', component: LogoutComponent }
];
