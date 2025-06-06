import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Recipe {
  required_data: string[];
  formats: Record<string, string>;
  preprocessing: string[];
}

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Chatbot Recipe</h1>
      
      <div *ngIf="recipe" class="space-y-6">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold mb-3">Required Data</h2>
          <ul class="list-disc pl-5">
            <li *ngFor="let data of recipe.required_data" class="mb-2">
              {{ data }}
            </li>
          </ul>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold mb-3">Data Formats</h2>
          <div *ngFor="let format of formatEntries" class="mb-2">
            <strong>{{ format[0] }}:</strong> {{ format[1] }}
          </div>
        </div>

        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-semibold mb-3">Pre-processing Steps</h2>
          <ol class="list-decimal pl-5">
            <li *ngFor="let step of recipe.preprocessing" class="mb-2">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>

      <div *ngIf="error" class="text-red-500 mt-4">
        {{ error }}
      </div>
    </div>
  `
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | null = null;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const chatbotType = params['type'];
      this.fetchRecipe(chatbotType);
    });
  }

  get formatEntries(): [string, string][] {
    return this.recipe ? Object.entries(this.recipe.formats) : [];
  }

  private fetchRecipe(type: string) {
    this.http.post<Recipe>('http://localhost:5000/api/generate-recipe', { type })
      .subscribe({
        next: (data) => this.recipe = data,
        error: (err) => this.error = 'Failed to load recipe. Please try again.'
      });
  }
}