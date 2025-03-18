import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatToolbarModule, MatCardModule, MatIconModule,MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private appComponent: AppComponent, private router: Router) {
    this.appComponent.activePage = '';
  }

  navigateToBankService() {
    this.router.navigate(['/bank-service']); // Ensure route matches your Angular routing
  }

}
