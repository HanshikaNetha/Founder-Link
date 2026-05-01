import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Team {

  constructor(private http: HttpClient) {}

  inviteMember(data: {
    startupId: number;
    invitedUserId: number;
    role: string;
  }): Observable<any> {
    return this.http.post(`/api/teams/inviteTeamMember`, data);
  }

  acceptInvitation(invitationId: number): Observable<any> {
    return this.http.put(
      `/api/teams/invitations/accept/${invitationId}`,
      {}
    );
  }

  rejectInvitation(invitationId: number): Observable<any> {
    return this.http.put(
      `/api/teams/invitations/reject/${invitationId}`,
      {}
    );
  }

  getTeamMembers(startupId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/teams/startup/${startupId}`);
  }
}
