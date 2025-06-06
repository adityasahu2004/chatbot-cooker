import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RecipeComponent implements OnInit {
  recipe: any = null;

  ngOnInit() {
    const savedRecipe = localStorage.getItem('modelRecipe');
    if (savedRecipe) {
      this.recipe = JSON.parse(savedRecipe);
    }
  }
}
