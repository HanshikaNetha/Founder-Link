import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Token } from '../../../../core/services/token';

@Component({
  selector: 'app-cofounder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cofounder-dashboard.html',
  styleUrls: ['./cofounder-dashboard.css'],
})
export class CofounderDashboardComponent {
  

  quickActions = [
    { icon: '👥', label: 'My Teams', path: '/teams' },
    { icon: '💬', label: 'Messages', path: '/messages' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
  ];

  
}
