import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private apiUrl = 'sk-d4656ab1aed2459095c827fd3b721393';

  constructor(private http: HttpClient) {}

  generateModelRecipe(modelType: string, purpose: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-recipe`, { modelType, purpose });
  }

  analyzeDataset(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post(`${this.apiUrl}/analyze-dataset`, formData);
  }

  generateChatbotCode(requirements: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-code`, requirements);
  }
}