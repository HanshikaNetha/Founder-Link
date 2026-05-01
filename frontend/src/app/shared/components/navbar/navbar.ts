import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Token } from '../../../core/services/token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  showProfile = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private tokenService :Token
  ) {}

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.tokenService.clear(); 
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.tokenService.clear(); 
        this.router.navigate(['/auth/login']);
      }
    });
  }
  userName() {
    return this.tokenService.getUser()?.name || 'User';
  }

  userRole() {
    return (this.tokenService.getUser()?.role || '').replace('ROLE_', '');
  }

  userInitial() {
    return this.userName()[0].toUpperCase();
  }


  
}
