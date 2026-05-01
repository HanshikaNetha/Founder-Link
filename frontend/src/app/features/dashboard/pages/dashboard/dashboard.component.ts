import { Component, OnInit } from '@angular/core';
import { Token } from '../../../../core/services/token';
import { CommonModule } from '@angular/common';
import { FounderDashboardComponent } from '../../components/founder-dashboard/founder-dashboard.component';
import { InvestorDashboardComponent } from '../../components/investor-dashboard/investor-dashboard.component';
import { CofounderDashboardComponent } from '../../components/cofounder-dashboard/cofounder-dashboard.component';
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FounderDashboardComponent,
    InvestorDashboardComponent, 
    CofounderDashboardComponent,
    AdminDashboardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit{
  role: string = '';

  constructor(private tokenService: Token) {}

  ngOnInit(): void {
    this.role = this.tokenService.getUser()?.role || '';
  }

  isFounder() {
    return this.role === 'ROLE_FOUNDER';
  }

  isInvestor() {
    return this.role === 'ROLE_INVESTOR';
  }

  isCofounder() {
    return this.role === 'ROLE_COFUNDER';
  }

  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }
}
