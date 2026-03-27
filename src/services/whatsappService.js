import sendToWhatsApp from "./httpRequest/sendToWhatsApp.js"; // Función para enviar solicitudes a la API de WhatsApp

// Clase para manejar las interacciones con la API de WhatsApp, incluyendo el envío de mensajes, 
// marcar mensajes como leídos y enviar botones interactivos
class WhatsappService {
  // Envía un mensaje de texto a un destinatario específico utilizando la API de WhatsApp
  // recibe el número de teléfono del destinatario y el cuerpo del mensaje para enviar un mensaje 
  // de texto a través de la API de WhatsApp, proporcionando una forma sencilla de comunicarse con los usuarios
  async sendMessage(to, body) {
    const data = {
      messaging_product: "whatsapp",
      to,
      text: { body },
    };

    await sendToWhatsApp(data);
  }

  // Marca un mensaje como leído utilizando la API de WhatsApp
  // recibe el ID del mensaje para marcarlo como leído en la API de WhatsApp, lo que ayuda 
  // a mantener un seguimiento de los mensajes que han sido leídos por el usuario
  async markMessageAsRead(messageId) {
    const data = {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    };
    
    await sendToWhatsApp(data);
  }

  // Envía un mensaje interactivo con botones al usuario utilizando la API de WhatsApp
  // recibe el número de teléfono del destinatario, el texto del cuerpo del mensaje 
  // y un array de botones para enviar un mensaje interactivo a través de la API de WhatsApp, 
  // permitiendo a los usuarios interactuar con opciones predefinidas y recibir respuestas
  //  personalizadas según su selección
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
