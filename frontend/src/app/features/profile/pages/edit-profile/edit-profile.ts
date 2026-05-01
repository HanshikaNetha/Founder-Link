import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Token } from '../../../../core/services/token';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private token = inject(Token);
  private router = inject(Router);

  loading = signal(false);

  form = this.fb.group({
    bio: ['', Validators.required],
    skills: ['', Validators.required],
    experience: ['', Validators.required],
    location: ['', Validators.required],
    companyName: [''],
    portfolioLinks: ['']
  });

  ngOnInit(): void {
    const user = this.token.getUser();
    const userId = user?.userId;

    this.auth.getUserById(userId).subscribe({
      next: (res: any) => this.form.patchValue(res),
      error: () => console.log('Failed to load profile')
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);

    const user = this.token.getUser();
    const userId = user?.userId;

    this.auth.updateProfile(userId, this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/profile']); 
      },
      error: () => {
        this.loading.set(false);
        alert('Failed to update profile');
      }
    });
  }

}
