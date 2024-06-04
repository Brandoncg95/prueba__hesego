import Router from "express-promise-router";
import {
  profile,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

// Creamos un nuevo enrutador utilizando express-promise-router para manejar las rutas de manera asíncrona
const router = Router();

// Ruta para el inicio de sesión de usuario
router.post("/signin", validateSchema(signinSchema), signin);

// Ruta para el registro de usuario
router.post("/signup", validateSchema(signupSchema), signup);

// Ruta para cerrar sesión
router.post("/signout", signout);

// Ruta para obtener el perfil del usuario autenticado
router.get("/profile", isAuth, profile);

// Exportamos el enrutador para su uso en otras partes de la aplicación
export default router;
