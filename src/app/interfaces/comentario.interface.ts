export interface Comentario {
    id?: string;
    texto: string;
    autorId: string;
    autorNombre: string;
    autorInicial: string;
    fechaCreacion: Date;
    reporteId: string;
    respuestas?: Comentario[];
    likes?: number;
    parentId?: string; // Para comentarios que son respuestas
} 