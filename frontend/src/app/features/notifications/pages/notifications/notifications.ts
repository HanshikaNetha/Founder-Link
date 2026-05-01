import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Notification } from '../../../../core/services/notification';
import { Token } from '../../../../core/services/token';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
})
export class Notifications implements OnInit
{
  notifications: any[] = [];

  constructor(
    private notificationService: Notification,
    private token: Token,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    const userId = this.token.getUser()?.userId;

    this.notificationService.getMyNotifications(userId)
      .subscribe({
        next: (res) => {
          console.log("NOTIFICATIONS:", res);
          this.notifications = res || [];
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  markAsRead(notificationId: number) {
    console.log("CLICKED ID:", notificationId);
    this.notificationService.markAsRead(notificationId)
      .subscribe({
        next: (res) => {
          console.log("MARK READ SUCCESS", res); // 🔥 add this
          this.loadNotifications();
        },
        error: (err) => {
          console.error("MARK READ ERROR", err); // 🔥 add this
        }
      });
  }

  extractInvitationId(message: string): number {
    const match = message.match(/Invitation ID:\s*(\d+)/);
    return match ? Number(match[1]) : 0;
  }
}
