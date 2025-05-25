import { Component, OnInit } from '@angular/core';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { NgForOf, NgIf } from '@angular/common';
import { NotificationService } from '../../../../services/notification.service';
import { TokenService } from '../../../../services/toker.service';
import { NotificacionDTO, EstadoNotificacion } from '../../../../interfaces/notificacion.interface';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    NotificacionComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  activeTab: 'all' | 'news' = 'all';
  notifications: NotificacionDTO[] = [];
  loading = false;

  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.loadNotifications();
    this.notificationService.loading$.subscribe(
      loading => this.loading = loading
    );
  }

  loadNotifications() {
    const userId = this.tokenService.getIdUsuario();
    if (userId) {
      this.notificationService.getNotificationsByUser(userId).subscribe({
        next: (notificaciones) => {
          this.notifications = notificaciones;
        },
        error: (error) => {
          console.error('Error al cargar notificaciones:', error);
        }
      });
    }
  }

  onMarkAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      // Actualizar el estado de la notificación localmente
      const notification = this.notifications.find(n => n.destinatario === notificationId);
      if (notification) {
        notification.estado = EstadoNotificacion.LEIDO;
      }
    });
  }

  onDelete(notificationId: string) {
    this.notificationService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
      },
      error: (error) => {
        console.error('Error al eliminar la notificación:', error);
      }
    });
  }

  changeTab(tab: 'all' | 'news') {
    this.activeTab = tab;
  }

  get filteredNotifications() {
    return this.activeTab === 'all' 
      ? this.notifications 
      : this.notifications.filter(n => n.estado === EstadoNotificacion.NO_LEIDO);
  }
  isNotificacionNoLeida(estado: EstadoNotificacion): boolean {
    return estado === EstadoNotificacion.NO_LEIDO;
  }

  isNotificacionLeida(estado: EstadoNotificacion): boolean {
    return estado === EstadoNotificacion.LEIDO;
  }
}
