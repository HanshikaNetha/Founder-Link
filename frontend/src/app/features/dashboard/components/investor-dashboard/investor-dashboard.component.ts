import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  InvestmentService } from '../../../../core/services/investment';
import { Startup } from '../../../../core/services/startup';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-investor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './investor-dashboard.html',
  styleUrls: ['./investor-dashboard.css'],
})
export class InvestorDashboardComponent implements OnInit{
  constructor(
    private investmentService: InvestmentService,
    private startupService: Startup,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  recentInvestments: any[] = [];
  startups: any[] = [];

  stats = [
    { label: 'Total Investments', value: 0, icon: '💰' },
    { label: 'Active Investments', value: 0, icon: '📈' },
  ];
  quickActions = [
    { icon: '💬', label: 'Messages', path: '/messages' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
  ];

  investmentPage = 0;
  investmentPageSize = 5;
  investmentPages: number[] = [];

  allInvestments: any[] = []; 

  startupPage = 0;
  startupPageSize = 5;
  startupPages: number[] = [];

  showInvestments = false;
  showStartups = false;

  loadingInvestments = false;
  loadingStartups = false;

  loadInvestments() {
    if (this.loadingInvestments) return;
    this.loadingInvestments=true
    this.investmentService.getMyInvestments().subscribe({
      next: (res: any[]) => {
        console.log('INVESTMENTS:', res);

        this.allInvestments = [...res];

        this.updateInvestmentPagination();

        const total = res.length;

        const active = res.filter(
          (i: any) => i.status === 'APPROVED'
        ).length;

        this.stats = [
          { label: 'Total Investments', value: total, icon: '💰' },
          { label: 'Active Investments', value: active, icon: '📈' },
        ];

        this.loadingInvestments = false;
        this.showInvestments = true;

        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading investments', err);
        this.loadingInvestments = false;
      }
    });
  }
  loadStartups() {
    if (this.loadingStartups) return;

    this.loadingStartups = true;
    this.startupService.getAllStartups(this.startupPage, this.startupPageSize).subscribe({
      next: (res: any) => {
        console.log('STARTUPS:', res);

        this.startups = [...(res.listContent || res.content || [])];
        this.startupPages = Array.from(
          { length: res.totalPages || 0 },
          (_, i) => i
        );

        this.loadingStartups = false;
        this.showStartups = true;

        this.cd.detectChanges();


        console.log('FINAL STARTUPS ARRAY:', this.startups);
      },
      error: (err: any) => {
        console.error('Error loading startups', err);
      }
    });   
  }
  

  investingStartupId: number | null = null;
  

  selectedStartupId: number | null = null;
  investmentAmount: number = 0;
  showModal: boolean = false;

  openInvestModal(startupId: number) {
    this.selectedStartupId = startupId;
    this.investmentAmount = 0;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmInvestment() {
    if (!this.investmentAmount || this.investmentAmount <= 0) {
      alert('Enter valid amount');
      return;
    }

    this.investmentService.createInvestment({
      startupId: this.selectedStartupId,
      amount: this.investmentAmount
    }).subscribe({
      next: () => {
        alert('Investment successful');

        this.loadInvestments(); 
        this.closeModal();
      },
      error: () => {
        alert('Investment failed');
      }
    });
  }

  updateInvestmentPagination() {
    const totalPages = Math.ceil(
      this.allInvestments.length / this.investmentPageSize
    );

    this.investmentPages = Array.from({ length: totalPages }, (_, i) => i);

    const start = this.investmentPage * this.investmentPageSize;

    this.recentInvestments = this.allInvestments.slice(
      start,
      start + this.investmentPageSize
    );
  }

  goToInvestmentPage(page: number) {
    this.investmentPage = page;
    this.updateInvestmentPagination();
  }

  nextInvestmentPage() {
    if (this.investmentPage < this.investmentPages.length - 1) {
      this.investmentPage++;
      this.updateInvestmentPagination();
    }
  }

  prevInvestmentPage() {
    if (this.investmentPage > 0) {
      this.investmentPage--;
      this.updateInvestmentPagination();
    }
  }

  goToStartupPage(page: number) {
    this.startupPage = page;
    this.loadStartups();
  }

  nextStartupPage() {
    if (this.startupPage < this.startupPages.length - 1) {
      this.startupPage++;
      this.loadStartups();
    }
  }

  prevStartupPage() {
    if (this.startupPage > 0) {
      this.startupPage--;
      this.loadStartups();
    }
  }
}
