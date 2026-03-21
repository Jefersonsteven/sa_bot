import config from "dotenv"; // Carga de variables de entorno
import messageHandler from "../services/messageHandler.js"; // Servicio para manejar los mensajes entrantes


// Ruta para manejar las solicitudes POST
app.post("/", (req, res) => {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

class WebhookController {
  // Método para manejar las solicitudes GET (verificación del webhook)
  verifyWebhook(req, res) {
    const {
      "hub.mode": mode,
      "hub.challenge": challenge,
      "hub.verify_token": token,
    } = req.query;

    if (mode === "subscribe" && token === config.WEBHOOK_VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.status(403).end();
    }
  }

 // Método para manejar las solicitudes POST (mensajes entrantes)
  async handleIncoming(req, res) {
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    // TODO: Procesar mensajes entrantes utilizando el servicio messageHandler
    res.status(200).end();
  }
}

export default new WebhookController();``
