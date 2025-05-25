export interface LoginDTO {
    email: string;
    password: string;
}

// Constantes para validaciones
export const LOGIN_VALIDATION = {
    email: {
        required: 'El email es requerido',
        email: 'Debe ser un email válido'
    },
    password: {
        required: 'La contraseña es requerida',
        minlength: 'La contraseña debe tener al menos 7 caracteres'
    }
} 