import { z } from 'zod';

// Esquema de validación para el registro de usuarios
export const signupSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un texto'
    }).min(1).max(255), // Se requiere que el nombre tenga entre 1 y 255 caracteres
    email: z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    }).email({
        message: 'El email debe ser un email valido'
    }), // Se requiere que el email sea válido según el formato de email
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(255) // Se requiere que la contraseña tenga entre 6 y 255 caracteres
});

// Esquema de validación para el inicio de sesión de usuarios
export const signinSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un texto'
    }).email({
        message: 'El email debe ser un email valido'
    }), // Se requiere que el email sea válido según el formato de email
    password: z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un texto'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(255, {
        message: 'La contraseña debe tener como máximo 255 caracteres'
    }) // Se requiere que la contraseña tenga entre 6 y 255 caracteres
});
