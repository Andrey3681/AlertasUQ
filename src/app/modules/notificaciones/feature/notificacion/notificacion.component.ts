import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationData } from '../../../../services/notification.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent {
  @Input() notification!: NotificationData;
  @Output() markAsRead = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  


  onMarkAsRead(event: Event) {
    event.stopPropagation();
    this.markAsRead.emit(this.notification.id);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.notification.id);
  }

  

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} día${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    return 'Ahora mismo';
  }
}
