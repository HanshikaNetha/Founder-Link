import { Component } from '@angular/core';
import { Startup } from '../../../../core/services/startup';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-startup',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-startup.html',
  styleUrl: './create-startup.css',
})
export class CreateStartup {
  startup = {
    startupName: '',
    description: '',
    stage: '',
    industry: '',
    fundingGoal: null,
    location: ''
  };

  loading = false;

  constructor(
    private startupService: Startup,
    public router: Router
  ) {}

  

  onSubmit() {
    if (!this.startup.startupName || !this.startup.description || !this.startup.stage) {
      alert('Please fill required fields');
      return;
    }

    this.loading = true;

    this.startupService.createStartup(this.startup).subscribe({
      next: () => {
        alert('Startup created successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creating startup');
        this.loading = false;
      }
    });
  }
}
