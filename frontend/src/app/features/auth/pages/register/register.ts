import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Toast } from '../../../../core/services/toast';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb     = inject(FormBuilder);
  private auth   = inject(Auth);
  private router = inject(Router);

  loading  = signal(false);
  showPass = signal(false);

  form = this.fb.group({
    name:     ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role:     ['', Validators.required]
  });

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  onSubmit(): void {
    if (this.form.invalid || this.loading()) return;

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.successMessage.set('Account created successfully! Please login.');
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {

        console.log("REGISTER ERROR:", err); // 🔍 debug

        if (err.status === 400 && err.error === 'Email already exists') {
          this.errorMessage.set('Email already exists');
        } 
        else if (typeof err.error === 'string') {
          this.errorMessage.set(err.error);
        } 
        else if (err.error && err.error.message) {
          this.errorMessage.set(err.error.message);
        } 
        else {
          this.errorMessage.set('Registration failed');
        }

        this.loading.set(false);
        
      },
      complete: () => this.loading.set(false)
    });
  }
}
