import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Startup } from '../../../../core/services/startup';

@Component({
  selector: 'app-founder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './founder-dashboard.html',
  styleUrls: ['./founder-dashboard.css'],
})

export class FounderDashboardComponent implements OnInit {

  stats = [
    { label: 'Total Startups', value: 0, icon: '🚀' },
    { label: 'Approved', value: 0, icon: '✓' },
    { label: 'Pending Review', value: 0, icon: '⏳' },
  ];

  recentStartups: any[] = [];

  quickActions = [
    { icon: '✚', label: 'New Startup', path: '/startups/create' },
    { icon: '👥', label: 'Manage Team', path: '/teams' },
    { icon: '💬', label: 'Messages', path: '/messages' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
  ];

  constructor(
    private startupService: Startup,
    private cd: ChangeDetectorRef
  ) {
    console.log('FounderDashboard CREATED');
  }
  loaded=false
  ngOnInit(): void {
    if (!this.loaded) {
      this.loadStartups();
      this.loaded = true;
      this.loadStats(); 
    }
    
  }

  currentPage = 0;
  pageSize = 5;

  totalPages = 0;
  pages: number[] = [];

  loadStartups() {
    this.startupService.getAllStartups(this.currentPage, this.pageSize).subscribe({
      next: (res: any) => {
        console.log('API RESPONSE:', res);
        console.log('LIST CONTENT:', res.listContent);

        const startups = res.listContent || [];

        this.recentStartups = [...startups];

        this.totalPages = res.totalPages || 0;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);

        const total = res.totalElements || 0;


        
        this.cd.detectChanges();

      },
      error: (err) => {
        console.error('Error loading startups', err);
      }
      
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadStartups();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadStartups();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadStartups();
    }
  }

  loadStats() {
    this.startupService.getAllStartups(0, 1000).subscribe({
      next: (res: any) => {

        const allStartups = res.listContent || [];

        const approved = allStartups.filter(
          (s: any) => s.approvalStatus === 'APPROVED'
        ).length;

        const pending = allStartups.filter(
          (s: any) => s.approvalStatus === 'PENDING'
        ).length;

        this.stats = [
          { label: 'Total Startups', value: res.totalElements || 0, icon: '🚀' },
          { label: 'Approved', value: approved, icon: '✓' },
          { label: 'Pending Review', value: pending, icon: '⏳' },
        ];

        this.cd.detectChanges();
      }
    });
  }
}