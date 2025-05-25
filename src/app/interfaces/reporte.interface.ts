// Enums
export enum EstadoReporte {
  PENDIENTE = 'PENDIENTE',
  VERIFICADO = 'VERIFICADO',
  ELIMINADO = 'ELIMINADO',
  RECHAZADO = 'RECHAZADO',
  RESUELTO = 'RESUELTO',
  NO_RESUELTO = 'NO_RESUELTO'
}

export enum EstadoSeveridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA'
}

// DTOs
export interface UbicacionDTO {
  longitud: number;
  latitud: number;
  radio: number;
}

export interface ComentarioDTO {
  id: string;
  contenido: string;
  fechaComentario: Date;
  idUsuario: string;
  idReporte: string;
  comentarios: ComentarioDTO[];
}

export interface ReporteDTO {
  id: string;
  titulo: string;
  idUsuario: string;
  ubicacion: UbicacionDTO;
  estadoReporte: EstadoReporte;
  categoria: CategoriaDTO;
  comentarios: ComentarioDTO[];
  resuelto: EstadoReporte;
  fotos: string[];
  numeroImportancia: number;
  severidad: EstadoSeveridad;
}

export interface CategoriaDTO {
  id: string;
  nombre: string;
}

export interface RegistrarReporteDto {
  titulo: string;
  idUsuario: string;
  ubicacion: UbicacionDTO;
  categoria: CategoriaDTO;
  fotos: string[];
  severidad: EstadoSeveridad;
}

export interface EditarReporteDto {
  id: string;
  titulo: string;
  ubicacion: UbicacionDTO;
  categoria: CategoriaDTO;
  fotos: string[];
  severidad: EstadoSeveridad;
}

export interface EliminarReporteDto {
  idReporte: string;
  password: string;
}

export interface MarcarReporteDto {
  id: string;
}

export interface GestionReporteDto {
  id: string;
  accion: string;
  comentario?: string;
}

export interface HistorialEstadoDTO {
  id: string;
  estado: EstadoReporte;
  fecha: Date;
  comentario: string;
}