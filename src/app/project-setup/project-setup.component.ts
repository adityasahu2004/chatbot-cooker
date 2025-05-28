import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Project Setup</h2>
      <form (ngSubmit)="onSubmit()" #projectForm="ngForm">
        <div class="mb-3">
          <label for="projectTitle" class="form-label">Project Title</label>
          <input 
            type="text" 
            class="form-control" 
            id="projectTitle"
            name="projectTitle"
            [(ngModel)]="projectData.title"
            required>
        </div>
        <div class="mb-3">
          <label for="modelDescription" class="form-label">Model Description</label>
          <textarea 
            class="form-control" 
            id="modelDescription"
            name="modelDescription"
            [(ngModel)]="projectData.description"
            rows="4"
            required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!projectForm.form.valid">Continue to Model Recipe</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class ProjectSetupComponent {
  projectData = {
    title: '',
    description: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Here you can add logic to save the project data
    console.log('Project Data:', this.projectData);
    // Navigate to model recipe page
    this.router.navigate(['/model-recipe'], { 
      state: { projectData: this.projectData } 
    });
  }
}