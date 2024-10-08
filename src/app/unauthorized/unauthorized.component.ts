import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(private router: Router) { }

  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/']);
  }
}
