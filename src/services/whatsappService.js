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

  async sendInteractiveButtons(to, BodyText, buttons) {
    try {
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: BodyText },
          action: {
            buttons: buttons
          }
        }
      }

      await sendToWhatsApp(data);
    } catch (error) {
      console.error("Error sending interactive buttons:", error);
    }
  }
}

export default new WhatsappService();
