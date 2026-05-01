import { ChangeDetectorRef, Component } from '@angular/core';
import { Message } from '../../../../core/services/message';
import { Token } from '../../../../core/services/token';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  userId: number | null = null;
  createdConversationId: number | null = null;

  sendConversationId: number | null = null;
  messageContent: string = '';

  fetchConversationId: number | null = null;
  messages: any[] = [];

  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(
    private messageService: Message,
    private cd: ChangeDetectorRef
  ) {}

  createConversation() {
    console.log("BUTTON CLICKED", this.userId);
    if (!this.userId) return;

    this.messageService.createConversation(this.userId)
      .subscribe({
        next: (res) => {
          console.log("CREATED:", res);
          this.createdConversationId = res.conversationId;
          this.cd.detectChanges();

        },
        error: (err) => console.error("CREATE ERROR:",err)
      });
  }

  sendMessage() {
    if (!this.sendConversationId || !this.messageContent.trim()) return;

    this.popupMessage = 'Sending message...';
    this.showPopup = true;

    this.messageService.sendMessage(
      this.sendConversationId,
      this.messageContent
    ).subscribe({
      next: (res) => {
        console.log("SENT:", res);
        this.messageContent = '';
        this.popupMessage = 'Message sent successfully';
        
        this.cd.detectChanges();

        setTimeout(() => {
          this.showPopup = false;
        }, 1500);
      },
      error: (err) => {
        console.error(err);

        this.popupMessage = 'Failed to send message';
        this.showPopup = true;

        setTimeout(() => {
          this.showPopup = false;
        }, 1500);
      }
      
    });
  }

  loadMessages() {
    if (!this.fetchConversationId) return;

    this.messageService.getMessages(this.fetchConversationId)
      .subscribe({
        next: (res) => {
          console.log("MESSAGES:", res);
          this.messages = res || [];
          this.cd.detectChanges();
        },
        error: (err) => console.error(err)
      });
  }
}
