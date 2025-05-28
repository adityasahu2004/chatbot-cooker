import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeepseekService } from '../services/deepseek.service';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kitchen-container">
      <div class="recipe-summary" *ngIf="recipe">
        <h2>Model Recipe Summary</h2>
        <pre>{{ recipe.content }}</pre>
      </div>

      <div class="upload-section">
        <h3>Upload Your Dataset</h3>
        <div class="upload-box" 
             (dragover)="onDragOver($event)" 
             (drop)="onDrop($event)"
             [class.drag-over]="isDragging">
          <input type="file" 
                 multiple 
                 (change)="onFileSelected($event)" 
                 #fileInput 
                 style="display: none">
          <button (click)="fileInput.click()">Select Files</button>
          <p>or drag and drop your files here</p>
        </div>

        <div class="file-list" *ngIf="selectedFiles.length > 0">
          <h4>Selected Files:</h4>
          <ul>
            <li *ngFor="let file of selectedFiles">{{ file.name }}</li>
          </ul>
          <button (click)="processDataset()" [disabled]="processing">Process Dataset</button>
        </div>

        <div class="analysis-results" *ngIf="analysisResults">
          <h3>Dataset Analysis</h3>
          <pre>{{ analysisResults | json }}</pre>
          <button *ngIf="analysisResults.isValid" 
                  (click)="generateChatbot()"
                  [disabled]="generating">
            Generate Chatbot
          </button>
          <div class="error-message" *ngIf="!analysisResults.isValid">
            {{ analysisResults.errorMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kitchen-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .recipe-summary {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .upload-section {
      margin-top: 2rem;
    }
    .upload-box {
      border: 2px dashed #ccc;
      padding: 2rem;
      text-align: center;
      margin: 1rem 0;
      border-radius: 8px;
    }
    .drag-over {
      border-color: #007bff;
      background: #f0f7ff;
    }
    .file-list {
      margin: 1rem 0;
    }
    .analysis-results {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .error-message {
      color: #dc3545;
      margin-top: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.5rem 0;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class KitchenComponent implements OnInit {
  recipe: any;
  selectedFiles: File[] = [];
  isDragging = false;
  processing = false;
  generating = false;
  analysisResults: any = null;

  constructor(
    private deepseekService: DeepseekService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedRecipe = localStorage.getItem('modelRecipe');
    if (savedRecipe) {
      this.recipe = JSON.parse(savedRecipe);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  processDataset() {
    this.processing = true;
    this.deepseekService.analyzeDataset(this.selectedFiles)
      .subscribe({
        next: (results) => {
          this.analysisResults = results;
          this.processing = false;
        },
        error: (error) => {
          this.analysisResults = {
            isValid: false,
            errorMessage: 'Error processing dataset. Please check your files and try again.'
          };
          this.processing = false;
        }
      });
  }

  generateChatbot() {
    this.generating = true;
    const requirements = {
      recipe: this.recipe,
      dataset: this.analysisResults
    };

    this.deepseekService.generateChatbotCode(requirements)
      .subscribe({
        next: (response) => {
          localStorage.setItem('generatedCode', JSON.stringify(response));
          this.router.navigate(['/ui-builder']);
        },
        error: (error) => {
          this.generating = false;
          // Handle error
        }
      });
  }
}