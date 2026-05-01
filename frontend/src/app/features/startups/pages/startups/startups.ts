import { ChangeDetectorRef, Component } from '@angular/core';
import { Startup } from '../../../../core/services/startup';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../../../core/services/investment';
import { Token } from '../../../../core/services/token';

@Component({
  selector: 'app-startups',
  imports: [CommonModule, FormsModule],
  templateUrl: './startups.html',
  styleUrl: './startups.css',
})
export class Startups {
  constructor(
    private startupService: Startup,
    private investmentService: InvestmentService,
    public tokenService: Token,
    private cd: ChangeDetectorRef
  ) {}

  startups: any[] = [];
  searchText: string = '';
  activeTab: string = 'ALL';


  currentPage = 0;
  pageSize = 6; 

  pages: number[] = [];

  ngOnInit(): void {
    this.loadStartups();
  }

  

  loadStartups() {
    this.startupService.getAllStartups(0, 20).subscribe({
      next: (res: any) => {
        console.log('STARTUPS PAGE:', res);

        this.startups = [...(res.listContent || res.content || [])]; 
        this.activeTab = 'ALL'; 
        this.updatePagination();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get filteredStartups() {
    return this.startups
      .filter((s: any) =>
        this.activeTab === 'ALL' || s.approvalStatus?.toUpperCase() === this.activeTab
      )
      .filter((s: any) =>
        s.startupName?.toLowerCase().includes(this.searchText.toLowerCase())
      );
  }

  setTab(tab: string) {
    this.activeTab = tab.toUpperCase();
    this.currentPage = 0;
    this.updatePagination();
  }

  selectedStartupId: number | null = null;
  startupInvestments: any[] = [];
  showInvestmentsModal: boolean = false;
  loadingInvestments: boolean = false;
  processingId: number | null = null;


  openInvestmentsModal(startupId: number) {
    this.selectedStartupId = startupId;
    this.showInvestmentsModal = true;
    this.loadingInvestments = true;

    this.investmentService.getInvestmentsByStartupId(startupId).subscribe({
        next: (res: any) => {
          console.log("STARTUP INVESTMENTS:", res);
          if (Array.isArray(res)) {
            this.startupInvestments = res;
          } else if (Array.isArray(res.listContent)) {
            this.startupInvestments = res.listContent;
          } else if (Array.isArray(res.content)) {
            this.startupInvestments = res.content;
          } else {
            this.startupInvestments = [];
          }
          this.startupInvestments = [...this.startupInvestments];

          console.log("FINAL ARRAY:", this.startupInvestments);
          this.loadingInvestments = false;

          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
          this.loadingInvestments = false;
        }
      });
    }
  closeInvestmentsModal() {
    this.showInvestmentsModal = false;
    this.startupInvestments = [];
  }

  approve(investmentId: number) {
    console.log("APPROVE CLICKED:", investmentId); // 🔥 ADD

    this.processingId = investmentId;

    this.investmentService.approveInvestment(investmentId).subscribe({
      next: () => {
        console.log("APPROVED SUCCESS"); // 🔥 ADD
        this.updateStatus(investmentId, 'APPROVED');
        this.processingId = null;
      },
      error: (err) => {
        console.error("APPROVE ERROR:", err); // 🔥 ADD
        this.processingId = null;
      }
    });
  }

  reject(investmentId: number) {
    console.log("REJECT CLICKED:", investmentId);

    this.processingId = investmentId;

    this.investmentService.rejectInvestment(investmentId).subscribe({
      next: () => {
        console.log("REJECT SUCCESS");
        this.updateStatus(investmentId, 'REJECTED');
        this.processingId = null;
      },
      error: (err) => {
        console.error("REJECT ERROR:", err);
        this.processingId = null;
      }
    });
  }

  updateStatus(id: number, status: string) {
    this.startupInvestments = this.startupInvestments.map(inv =>
      inv.investmentId === id ? { ...inv, status } : inv
    );
  }

  get paginatedStartups() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    return this.filteredStartups.slice(start, end);
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredStartups.length / this.pageSize);

    this.pages = Array.from({ length: totalPages }, (_, i) => i);

    // 🔥 reset if current page goes out of range
    if (this.currentPage >= totalPages) {
      this.currentPage = 0;
    }
  }

  ngDoCheck() {
    this.updatePagination();
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
}
