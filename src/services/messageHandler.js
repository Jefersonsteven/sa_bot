import whatsappService from "./whatsappService.js"; // Servicio para interactuar con la API de WhatsApp

// Clase para manejar los mensajes entrantes y responder según el contenido
class MessageHandler {

  // Maneja los mensajes entrantes y responde según el contenido
  // recibe el mensaje y la información del remitente para personalizar las respuestas
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
    } else if (message?.type === 'interactive') {
      const option = message?.interactive?.button_reply?.id;
      await this.handleMenuOption(message.from, option);
      await whatsappService.markMessageAsRead(message.id);
    }
  }

  // Verifica si el mensaje contiene un saludo común
  // recibe el mensaje y compara con una lista de palabras clave de saludo para 
  // determinar si es un saludo
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

  // Obtiene el nombre del remitente a partir de la información proporcionada
  // recibe la información del remitente y extrae el nombre para personalizar 
  // las respuestas
  getSenderName(senderInfo) {
    const fullname = senderInfo?.profile?.name || "";
    const firstName = fullname.split(" ")[0] || "";
    return firstName || senderInfo?.wa_id || "";
  }

  // Envía un mensaje de bienvenida personalizado al usuario
  // recibe el número de teléfono del destinatario, el ID del mensaje para marcarlo 
  // como leído y la información del remitente para personalizar el mensaje de bienvenida
  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage = `¡Hola ${name}!, Bienvenido a Soluciones Aragon, Gracias por contactarnos. ¿En qué puedo ayudarte hoy?`;
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }

  // Envía un menú interactivo con opciones al usuario
  // recibe el número de teléfono del destinatario para enviar el menú interactivo 
  // con opciones predefinidas para que el usuario elija una opción y reciba una 
  // respuesta personalizada según su selección
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

  // Maneja la opción seleccionada por el usuario en el menú interactivo
  // recibe el número de teléfono del destinatario y la opción seleccionada 
  // para enviar una respuesta personalizada según la opción elegida por el 
  // usuario en el menú interactivo, proporcionando información relevante o 
  // solicitando más detalles según sea necesario
  async handleMenuOption(to, option) {
    let response;

    switch (option) {
      case "option_1": // Opción de catálogo
        response = "Nuestro catálogo incluye una amplia gama de productos para satisfacer tus necesidades. ¿Qué tipo de productos te interesan?";
        break;
      case "option_2": // Opción de consulta
        response = "Por favor, proporciona más detalles sobre tu consulta para que podamos ayudarte mejor.";
        break;
      case "option_3": // Opción de ubicación
        response = "Nuestra ubicación es: Calle 17 #96G - 08, Fontibon, Villemar, Bogota D.C. ¿Necesitas indicaciones para llegar?";
        break;
      default:
        response = "Opción no reconocida. Por favor, elige una opción válida del menú.";
    }
    await whatsappService.sendMessage(to, response);
  }
}

export default new MessageHandler();
