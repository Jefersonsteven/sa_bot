import config from "dotenv"; // Carga de variables de entorno
import messageHandler from "../services/messageHandler.js"; // Servicio para manejar los mensajes entrantes

class WebhookController {
  // Método para manejar las solicitudes GET (verificación del webhook)
  verifyWebhook(req, res) {
    const {
      "hub.mode": mode,
      "hub.challenge": challenge,
      "hub.verify_token": token,
    } = req.query;

    if (mode === "subscribe" && token === config.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.status(403).end();
    }
  }

 // Método para manejar las solicitudes POST (mensajes entrantes)
  async handleIncoming(req, res) {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]; // Extraemos el mensaje del cuerpo de la solicitud
    if (message) {
      await messageHandler.handleIncomingMessage(message);
    }
    res.sendStatus(200); // Respondemos con un estado 200 para indicar que la solicitud fue procesada correctamente
  }
}

export default new WebhookController();``
