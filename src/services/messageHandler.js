import whatsappService from "./whatsappService.js"; // Servicio para interactuar con la API de WhatsApp

class MessageHandler {
  async handleIncomingMessage(message) {
    if (message?.type === "text") {
      const incommingMessage = message.text.body.toLowerCase();

      if (this.isGretting(incommingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id);
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

  async sendWelcomeMessage(to, messageId) {
    const welcomeMessage =
      "¡Hola! Bienvenido a Soluciones Aragon, Gracias por contactarnos. ¿En qué puedo ayudarte hoy?";
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }
}

export default new MessageHandler();
