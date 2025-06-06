import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/chatbot-setup', pathMatch: 'full' },
  { path: 'chatbot-setup', loadComponent: () => import('./project-setup/project-setup.component').then(m => m.ProjectSetupComponent) },
  { path: 'recipe', loadComponent: () => import('./model-recipe/recipe/recipe.component').then(m => m.RecipeComponent) }
];