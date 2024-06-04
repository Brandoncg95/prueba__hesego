-- Crea una tabla llamada 'task' para almacenar las tareas
CREATE TABLE task(
    id SERIAL PRIMARY KEY,  -- Identificador único de la tarea
    title VARCHAR(255) UNIQUE NOT NULL,  -- Título de la tarea (único y obligatorio)
    description TEXT  -- Descripción de la tarea
);

-- Añade una columna 'user_id' a la tabla 'task' para relacionar las tareas con los usuarios
ALTER TABLE task ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Elimina la restricción de unicidad del título en la tabla 'task'
ALTER TABLE task DROP CONSTRAINT task_title_key;

-- Crea una tabla llamada 'users' para almacenar la información de los usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,  -- Identificador único del usuario
    name VARCHAR(255) NOT NULL,  -- Nombre del usuario (obligatorio)
    password VARCHAR(255) NOT NULL,  -- Contraseña del usuario (obligatoria)
    email VARCHAR(255) UNIQUE NOT NULL,  -- Correo electrónico del usuario (único y obligatorio)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de creación del usuario (por defecto, la actual)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha y hora de última actualización del usuario (por defecto, la actual)
);

-- Añade una columna 'gravatar' a la tabla 'users' para almacenar el enlace al gravatar del usuario
ALTER TABLE users ADD COLUMN gravatar VARCHAR(255);
