export interface CrearCategoriaDTO {
    nombre: string;
    descripcion: string;
}

export interface CategoriaDTO {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface ActualizarCategoriaDTO {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface EliminarCategoriaDTO {
    id: number;
}

export const CREAR_CATEGORIA_VALIDATION = {
    nombre: {
        required: 'El nombre es requerido',
        minlength: 'El nombre debe tener al menos 3 caracteres'
    },
    descripcion: {
        required: 'La descripción es requerida',
        minlength: 'La descripción debe tener al menos 10 caracteres'
    }
}

export const ELIMINAR_CATEGORIA_VALIDATION = {
    id: {
        required: 'El id es requerido',
        minlength: 'El id debe tener al menos 1 caracter'
    }
}

