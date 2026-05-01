import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Token } from '../../../../core/services/token';
import { Team } from '../../../../core/services/team';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, FormsModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {
  constructor(
    private teamService: Team,
    private token: Token,
    private cd: ChangeDetectorRef
  ) {}

  
  isFounder(): boolean {
    return this.token.getUser()?.role === 'ROLE_FOUNDER';
  }

  teamMembers: any[] = [];

  // invite form
  invitedUserId: number | null = null;
  role: string = 'CTO';

  invitationInputId: number | null = null;

  

  startupId: number | null = null;

  loadTeam() {
    console.log("LOAD TEAM CLICKED");
    console.log("Startup ID:", this.startupId);
    if (!this.startupId){
      alert("Enter startup ID");
      return;
    }

    this.teamService.getTeamMembers(this.startupId)
      .subscribe({
        next: (res) => {
          console.log("TEAM RESPONSE:", res);
          this.teamMembers = res || [];
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error("TEAM ERROR:", err);
        }
      });
  }

  inviteMember() {
    if (!this.startupId || !this.invitedUserId) {
      alert('Enter Startup ID and User ID');
      return;
    }

    this.teamService.inviteMember({
      startupId: this.startupId,
      invitedUserId: this.invitedUserId,
      role: this.role
    }).subscribe({
      next: (res: any) => {
        alert(`Invitation sent. ID: ${res.invitationId}`);
        this.invitedUserId = null;
      },
      error: () => {
        alert('Failed to invite');
      }
    });
  }


  acceptById() {
    if (!this.invitationInputId) {
      alert('Enter Invitation ID');
      return;
    }

    this.teamService.acceptInvitation(this.invitationInputId)
      .subscribe({
        next: () => {
          alert('Accepted');
          this.loadTeam();
        },
        error: () => {
          alert('Failed to accept');
        }
      });
  }

  rejectById() {
    if (!this.invitationInputId) {
      alert('Enter Invitation ID');
      return;
    }

    this.teamService.rejectInvitation(this.invitationInputId)
      .subscribe({
        next: () => {
          alert('Rejected');
        },
        error: () => {
          alert('Failed to reject');
        }
      });
  }
}
