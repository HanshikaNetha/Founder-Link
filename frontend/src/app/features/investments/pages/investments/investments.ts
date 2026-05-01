import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../../../core/services/investment';

@Component({
  selector: 'app-investments',
  imports: [CommonModule, FormsModule],
  templateUrl: './investments.html',
  styleUrl: './investments.css',
})
export class Investments implements OnInit{
  searchText: string = '';
  activeTab: string = 'ALL';

  constructor(private investmentService: InvestmentService) {}

  investments: any[] = [];

  ngOnInit(): void {
    this.loadInvestments();
  }

  currentPage = 0;
  pageSize = 5;

  pages: number[] = [];

  loadInvestments() {
    this.investmentService.getMyInvestments().subscribe({
      next: (res: any[]) => {
        console.log('INV PAGE DATA:', res);
        this.investments = res || [];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get filteredInvestments() {
    const data = this.filteredData;

    const totalPages = Math.ceil(data.length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);

    if (this.currentPage >= totalPages) {
      this.currentPage = 0;
    }

    const start = this.currentPage * this.pageSize;

    return data.slice(start, start + this.pageSize);
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.currentPage = 0;
  }

  get filteredData() {
    return this.investments
      .filter(inv => 
        this.activeTab === 'ALL' || inv.status === this.activeTab
      )
      .filter(inv =>
        inv.startupId.toString().includes(this.searchText)
      );
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
