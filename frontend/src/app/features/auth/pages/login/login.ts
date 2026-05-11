import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Token } from '../../../../core/services/token';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb      = inject(FormBuilder);
  private auth    = inject(Auth);
  private router  = inject(Router);
  private tokenService = inject(Token);

  loading  = signal(false);
  showPass = signal(false);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = signal<string | null>(null);
  
  onSubmit(): void {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.form.value as any).subscribe({
      next: (res: any) => {
        console.log("SUCCESS RESPONSE:", res);

        this.tokenService.setAccessToken(res.token);
        this.tokenService.setRefreshToken(res.refreshToken);

        this.tokenService.setUser({
          userId: res.userId,
          role: res.role
        })

        this.auth.getUserById(res.userId).subscribe({
          next: (profile: any) => {
            console.log("PROFILE:", profile);

            const currentUser = this.tokenService.getUser();

            this.tokenService.setUser({
              ...currentUser,
              name: profile.name
            });

            this.loading.set(false);

            if (!profile.bio || !profile.skills || !profile.location) {
              this.router.navigate(['/profile/edit']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },

          error: (err) => {
            console.log("PROFILE ERROR:", err);

            this.loading.set(false);
            this.router.navigate(['/dashboard']);
          }
        });
      },

      error: (err: any) => {
        console.log("LOGIN ERROR:", err);

        if (err.status === 403) {
          this.loading.set(false);
          this.router.navigate(['/dashboard']);
          return;
        }

        if (err.status === 401) {
          this.errorMessage.set('Invalid email or password');
        } else {
          this.errorMessage.set('Something went wrong');
        }

        this.loading.set(false);
      }
    });
  }


}
