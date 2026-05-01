import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Message {

  constructor(private http: HttpClient) {}

  createConversation(userId: number): Observable<any> {
    return this.http.post<any>(
      `/api/messages/CreateConversation`,
      {
        userId: userId
      }
    );
  }

  sendMessage(conversationId: number, content: string): Observable<any> {
    return this.http.post<any>(
      `/api/messages/SendMessage`,
      {
        conversationId: conversationId,
        content: content
      }
    );
  }

  getMessages(conversationId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `/api/messages/conversation/${conversationId}`
    );
  }
}
