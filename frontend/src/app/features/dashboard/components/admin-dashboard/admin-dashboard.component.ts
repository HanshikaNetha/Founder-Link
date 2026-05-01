import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Startup } from '../../../../core/services/startup';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent {
  constructor(
    private startupService: Startup,
    private cd: ChangeDetectorRef
  ) {}

  startups: any[] = [];
  pendingStartups: any[] = [];

  stats = [
    { label: 'Total Startups', value: 0, icon: '🚀' },
    { label: 'Pending Approvals', value: 0, icon: '⏳' },
    { label: 'Approved', value: 0, icon: '✅' },
  ];

  

  ngOnInit(): void {
    this.loadStartups();
    this.loadStats();
  }

  currentPage = 0;
  pageSize = 5;

  totalPages = 0;
  totalElements = 0;

  pages: number[] = [];

  loadStartups() {
    this.startupService.getAllStartups(this.currentPage, this.pageSize).subscribe({
      next: (res: any) => {

        const startups = res.listContent || [];

        this.startups = [...startups];

        this.pendingStartups = startups.filter(
          (s: any) => s.approvalStatus === 'PENDING'
        );

        if (this.pendingStartups.length === 0 && this.currentPage > 0) {
          this.currentPage--;
          this.loadStartups();
          return;
        }

        

        this.totalPages = res.totalPages || 0;
        this.totalElements = res.totalElements || 0;

        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);

        

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

  approveStartup(id: number) {
    this.startupService.approveStartup(id).subscribe({
      next: () => {
        this.loadStartups();
        this.loadStats(); 
      },
      error: () => alert('Approve failed')
    });
  }

  rejectStartup(id: number) {
    this.startupService.rejectStartup(id).subscribe({
      next: () => {
        this.loadStartups();
        this.loadStats(); 
      },
      error: () => alert('Reject failed')
    });
  }

  loadStats() {
    this.startupService.getAllStartups(0, 1000).subscribe({
      next: (res: any) => {

        const allStartups = res.listContent || [];

        const pending = allStartups.filter(
          (s: any) => s.approvalStatus === 'PENDING'
        ).length;

        const approved = allStartups.filter(
          (s: any) => s.approvalStatus === 'APPROVED'
        ).length;

        this.stats = [
          { label: 'Total Startups', value: res.totalElements || 0, icon: '🚀' },
          { label: 'Pending Approvals', value: pending, icon: '⏳' },
          { label: 'Approved', value: approved, icon: '✅' },
        ];

        this.cd.detectChanges();
      }
    });
  }
}
