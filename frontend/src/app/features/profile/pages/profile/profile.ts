import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { Token } from '../../../../core/services/token';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{
  private auth = inject(Auth);
  private token = inject(Token);
  private router = inject(Router);

  loading = signal(true);
  user = signal<any>(null);

  ngOnInit(): void {
    const storedUser = this.token.getUser();
    const userId = storedUser?.userId;


    if (!userId) {
      console.log("User ID missing ❌");
      this.loading.set(false);
      return;
    }

    this.auth.getUserById(userId).subscribe({
      next: (res) => {
        console.log("FULL PROFILE RESPONSE:", res);
        this.user.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.log("PRfole Error:", err);
        this.loading.set(false);
      }
    });
    console.log("Stored User:", this.token.getUser());
  }

  goToEdit() {
    this.router.navigate(['/profile/edit']);  
  }
}
