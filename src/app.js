// Importamos las dependencias necesarias
import express from "express"; // Framework para crear el servidor
import config from "./config/env.js"; // Configuración de variables de entorno
import webhookRoutes from "./routes/webhookRoutes.js"; // Rutas del webhook

// Cargamos las variables de entorno desde el archivo .env.local
dotenv.config({ path: ".env.local" });

// Creamos una instancia de Express
const app = express();
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON  

// Importamos las rutas del webhook
app.use("/", webhookRoutes)

// Ruta de prueba para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("¡Hola! Este es el servidor del bot de Soluciones Aragón.");
});

// Iniciamos el servidor en el puerto especificado en la configuración
app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});