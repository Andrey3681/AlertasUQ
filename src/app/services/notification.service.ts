import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, finalize, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificacionDTO } from '../interfaces/notificacion.interface';

export interface NotificationData {
  initial: string;
  username: string;
  message: string;
  type: 'all' | 'news';
  date: Date;
  id: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + '/notificaciones'; // Reemplazar con tu URL real
  private mockNotifications: NotificationData[] = [
    { 
      id: '1',
      initial: 'M', 
      username: '@Maria1234', 
      message: 'Le Ha Dado Me Gusta A Tu Reporte: ¡Peligro! Poste De Luz A Punto De Caer En El Barrio San José',
      type: 'all',
      date: new Date(),
      read: false
    },
    { 
      id: '2',
      initial: 'C', 
      username: '@Carlos12', 
      message: 'Le Ha Dado Me Gusta A Tu Reporte: ¡Peligro! Poste De Luz A Punto De Caer En El Barrio San José',
      type: 'all',
      date: new Date(),
      read: true
    },
    { 
      id: '3',
      initial: 'A', 
      username: '@Admin123', 
      message: 'Ha Eliminado Tu Reporte: "Tengo Miedo"',
      type: 'news',
      date: new Date(),
      read: false
    },
    { 
      id: '4',
      initial: 'P', 
      username: '@Pepita', 
      message: 'Le Ha Dado Me Gusta A Tu Reporte: ¡Cuidado! En El Barrio San José Estan Robando Mucho ;=0',
      type: 'all',
      date: new Date(),
      read: true
    },
    { 
      id: '5',
      initial: 'J', 
      username: '@Jose5678', 
      message: '*Ha Publicado Un Reporte Cerca A Ti, Echale Un Vistazo Para Mantenerte Informado!!!! *',
      type: 'news',
      date: new Date(),
      read: false
    },
    { 
      id: '6',
      initial: 'M', 
      username: '@Maria1234', 
      message: 'Le Ha Dado Me Gusta A Tu Comentario: Cuidado Por Esa Zona',
      type: 'all',
      date: new Date(),
      read: true
    }
  ];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<NotificationData[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    // En producción, usar esto:
    // return this.http.get<NotificationData[]>(this.apiUrl).pipe(
    //   catchError(this.handleError),
    //   finalize(() => this.loadingSubject.next(false))
    // );

    // Para desarrollo, usamos datos mock:
    return of(this.mockNotifications).pipe(
      delay(1000),
      tap(() => this.loadingSubject.next(false)),
      catchError(this.handleError)
    );
  }

  markAsRead(notificationId: string): Observable<void> {
    this.loadingSubject.next(true);
    
    // En producción:
    // return this.http.patch<void>(`${this.apiUrl}/${notificationId}/read`, {}).pipe(
    //   catchError(this.handleError),
    //   finalize(() => this.loadingSubject.next(false))
    // );

    // Para desarrollo:
    return of(void 0).pipe(
      delay(500),
      tap(() => {
        const notification = this.mockNotifications.find(n => n.id === notificationId);
        if (notification) {
          notification.read = true;
        }
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    this.errorSubject.next(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  getNotificationsByUser(userId: string): Observable<NotificacionDTO[]> {
    return this.http.get<NotificacionDTO[]>(`${this.apiUrl}/${userId}`).pipe(
      map((response: any) => response.mensaje),
      catchError(this.handleError)
    );
  }

  deleteNotification(notificationId: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`).pipe(
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }


} 