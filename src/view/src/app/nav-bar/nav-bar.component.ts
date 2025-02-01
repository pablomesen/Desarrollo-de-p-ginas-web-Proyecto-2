import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isLoginOrRegister = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => (this.isLoggedIn = isAuthenticated)
    );
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isLoginOrRegister = currentRoute === '/login' || currentRoute === '/register';
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      },
    });
  }
}
