import whatsappService from "./whatsappService.js"; // Servicio para interactuar con la API de WhatsApp

class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === "text") {
      const incommingMessage = message.text.body.toLowerCase();

      if (this.isGretting(incommingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
        await this.sendWelcomeMenu(message.from);
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
    const fullname = senderInfo?.profile?.name || "";
    const firstName = fullname.split(" ")[0] || "";
    return firstName || senderInfo?.wa_id || "";
  }

  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage = `¡Hola ${name}!, Bienvenido a Soluciones Aragon, Gracias por contactarnos. ¿En qué puedo ayudarte hoy?`;
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }

  async sendWelcomeMenu(to) {
    const menuMessage = `Elige una opción`;
    const buttons = [
      {
        type: "reply",
        reply: { id: "option_1", title: "Catalogo" },
      },
      {
        type: "reply",
        reply: { id: "option_2", title: "Consultar" },
      },
      {
        type: "reply",
        reply: { id: "option_3", title: "Ubicación" },
      },
    ];

    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
  }
}

export default new MessageHandler();
