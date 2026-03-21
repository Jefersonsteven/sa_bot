// Importamos las dependencias necesarias
import express from 'express'; // Framework para crear el servidor
import dotenv from 'dotenv'; // Carga de variables de entorno

// Cargamos las variables de entorno desde el archivo .env.local
dotenv.config({ path: '.env.local' });

// Creamos una instancia de Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Obtenemos el puerto y el token de verificación de las variables de entorno
const port = process.env.PORT || 3000;
const verifyToken = process.env.ACCESS_TOKEN;

// Ruta para manejar las solicitudes GET (verificación del webhook)
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Ruta para manejar las solicitudes POST
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Iniciamos el servidor y escuchamos en el puerto especificado
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});