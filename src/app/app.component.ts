import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    DragDropModule,
    RouterOutlet, 
    MatToolbarModule, 
    MatCardModule, 
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activePage: string = '';
  searchQuery: string = '';

  constructor(private router: Router) {
  }

  setActivePage(page: string) {
    this.activePage = page;
    this.router.navigateByUrl(page);
  }

  onSearch() {
    // Implement search functionality
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  myAccount() {
    this.router.navigate(['/']);
  }

  contact(){
    this.router.navigate(['/']);
  }

}