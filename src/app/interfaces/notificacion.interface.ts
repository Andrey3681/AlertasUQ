export interface NotificacionDTO {
    id: string;
    destinatario: string;
    mensaje: string;
    fecha: Date;
    remitente: string;
    titulo: string;
    estado: EstadoNotificacion;
}

export enum EstadoNotificacion {
    LEIDO = 'LEIDO',
    NO_LEIDO = 'NO_LEIDO'
}
