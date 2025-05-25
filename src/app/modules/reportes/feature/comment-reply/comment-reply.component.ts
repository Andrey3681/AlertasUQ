import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-reply',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-reply.component.html',
  styleUrl: './comment-reply.component.css'
})
export class CommentReplyComponent {
  @Input() replyingTo: string = '';
  @Output() cancelReply = new EventEmitter<void>();
  @Output() submitReply = new EventEmitter<string>();
  
  replyText: string = '';

  onCancel() {
    this.cancelReply.emit();
  }

  onSubmit() {
    if (this.replyText.trim()) {
      this.submitReply.emit(this.replyText);
      this.replyText = '';
    }
  }
}
