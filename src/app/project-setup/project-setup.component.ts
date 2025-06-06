import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.css'],
  standalone: true,
  imports: [FormsModule] // Add FormsModule here
})
export class ProjectSetupComponent {
  userRequirements: string = '';

  constructor(private router: Router) {}

  generateRecipe() {
    // Use this.userRequirements as needed
  }
}