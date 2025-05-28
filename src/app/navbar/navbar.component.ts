import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/model-recipe">Home</a>
      <a routerLink="/about">About Us</a>
    </nav>
  `,
  styles: [`
    nav {
      padding: 1rem;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    a {
      margin-right: 1rem;
      text-decoration: none;
      color: #333;
    }
    a:hover {
      color: #0366d6;
    }
  `]
})
export class NavbarComponent {}