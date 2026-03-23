import whatsappService from "./whatsappService.js"; // Servicio para interactuar con la API de WhatsApp

class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === "text") {
      const incommingMessage = message.text.body.toLowerCase();

      if (this.isGretting(incommingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
      } else {
        const response = `Echo: ${message.text.body}`;
        await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markMessageAsRead(message.id);
    }
  }

  isGretting(message) {
    const greetingKeywords = [
      "hola",
      "buenos días",
      "buenas tardes",
      "buenas noches",
      "qué tal",
      "cómo estás",
    ];
    return greetingKeywords.some((keyword) => message.includes(keyword));
  }

  getSenderName(senderInfo) {
    return senderInfo?.profile?.name || senderInfo?.wa_id || "";
  }

  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage =
      `¡Hola ${name}!, Bienvenido a Soluciones Aragon, Gracias por contactarnos. ¿En qué puedo ayudarte hoy?`;
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }
}

export default new MessageHandler();
