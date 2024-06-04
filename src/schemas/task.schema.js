import { z } from "zod";

// Esquema de validación para la creación de una tarea
export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "El titulo es requerido",
      invalid_type_error: "El titulo debe ser un texto",
    })
    .min(1)
    .max(255), // Se requiere que el título tenga entre 1 y 255 caracteres
  description: z
    .string({
      required_error: "La descripcion es requerida",
      invalid_type_error: "La descripcion debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional(), // La descripción es opcional pero, si se proporciona, debe tener entre 1 y 255 caracteres
});

// Esquema de validación para la actualización de una tarea
export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "El titulo es requerido",
      invalid_type_error: "El titulo debe ser un texto",
    })
    .min(1)
    .max(255).optional(), // El título es opcional pero, si se proporciona, debe tener entre 1 y 255 caracteres
  description: z
    .string({
      required_error: "La descripcion es requerida",
      invalid_type_error: "La descripcion debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional(), // La descripción es opcional pero, si se proporciona, debe tener entre 1 y 255 caracteres
});

