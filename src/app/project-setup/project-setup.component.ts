import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.css'],
  standalone: true,
  imports: [FormsModule] // Add FormsModule here
})
export class ProjectSetupComponent implements OnInit {
  userRequirements: string = '';

  constructor(private router: Router, private http: HttpClient) {} // Inject HttpClient

  ngOnInit() {
    // Any initialization logic can go here
  }

  generateRecipe() {
    this.http.post<any>('http://localhost:5000/api/generate-recipe', { requirements: this.userRequirements })
      .subscribe(
        (response) => {
          localStorage.setItem('modelRecipe', JSON.stringify(response));
          this.router.navigate(['/recipe']);
        },
        (error) => {
          console.error('Error generating recipe:', error);
        }
      );
  }
}