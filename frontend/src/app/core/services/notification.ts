import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  private baseUrl = '/api/notifications';

  constructor(private http: HttpClient) {}

  getMyNotifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/getUserNotifications/${userId}`
    );
  }

  markAsRead(notificationId: number) {
    return this.http.put(
      `${this.baseUrl}/markAsRead/${notificationId}`,
      {}
    );
  }
}
