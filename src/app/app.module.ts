import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './states/tasks/reducer';
import { TaskEffects } from './states/tasks/effects';
import { AppComponent } from './app.component'; // Import your main AppComponent
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ],
  imports: [
    BrowserModule,
    AppComponent, // Import BrowserModule
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    FormsModule, // Add FormsModule here
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
     // Import your ComponentsModule
    // RouterModule is not needed here since AppRoutingModule already imports it
  ],
  providers: [
    provideHttpClient(), // Use this instead of HttpClientModule
    provideRouter(routes) // Include your routing configuration
  ]
})
export class AppModule { }
