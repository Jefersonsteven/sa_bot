import sendToWhatsApp from "./httpRequest/sendToWhatsApp.js"; // Función para enviar solicitudes a la API de WhatsApp

class WhatsappService {
  async sendMessage(to, body, messageId) {
    const data = {
      messaging_product: "whatsapp",
      to,
      text: { body },
    };

    await sendToWhatsApp(data);
  }

  async markMessageAsRead(messageId) {
    const data = {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    };

    await sendToWhatsApp(data);
  }
}

export default new WhatsappService();
