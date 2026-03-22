import whatsappService from "./whatsappService.js"; // Servicio para interactuar con la API de WhatsApp

class MessageHandler {

    async handleIncomingMessage(message) {
        
        if (message?.type === "text") {
            const response = `Echo: ${message.text.body}`;
            await whatsappService.sendMessage(message.from, response, message.id);
            await whatsappService.markMessageAsRead(message.id);
        } else {
            console.log("No se encontró un mensaje válido en la solicitud.");
        }
    }
}

export default new MessageHandler();