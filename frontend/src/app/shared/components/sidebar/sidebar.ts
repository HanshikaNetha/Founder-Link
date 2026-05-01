import { Component, inject, signal } from '@angular/core';
import { Token } from '../../../core/services/token';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '⊞', roles: [] },

  { label: 'Startups', path: '/startups', icon: '🚀', roles: ['ROLE_INVESTOR', 'ROLE_FOUNDER', 'ROLE_COFUNDER', 'ROLE_ADMIN'] },

  { label: 'Create Startup', path: '/startups/create', icon: '✚', roles: ['ROLE_FOUNDER'] },

  { label: 'Investments', path: '/investments', icon: '💰', roles: ['ROLE_INVESTOR'] },

  { label: 'Teams', path: '/teams', icon: '👥', roles: ['ROLE_FOUNDER', 'ROLE_COFUNDER'] },

  { label: 'Messages', path: '/messages', icon: '💬', roles: ['ROLE_FOUNDER', 'ROLE_INVESTOR', 'ROLE_COFUNDER'] },

  { label: 'Notifications', path: '/notifications', icon: '🔔', roles: ['ROLE_FOUNDER', 'ROLE_INVESTOR', 'ROLE_COFUNDER'] },

  { label: 'Profile', path: '/profile', icon: '👤', roles: ['ROLE_FOUNDER', 'ROLE_INVESTOR', 'ROLE_COFUNDER'] },
];

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private tokenService = inject(Token);

  collapsed = signal(false);

  toggle() {
    this.collapsed.update(v => !v);
  }

  visibleItems() {
    const role = this.tokenService.getUser()?.role || '';
    return NAV_ITEMS.filter(item =>
      item.roles.length === 0 || item.roles.includes(role)
    );
  }

  userName() {
    return this.tokenService.getUser()?.name || 'User';
  }

  userRole() {
    return (this.tokenService.getUser()?.role || '').replace('ROLE_', '');
  }

  userInitial() {
    return (this.tokenService.getUser()?.name || 'U')[0];
  }
}
