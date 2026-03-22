import axios from "axios"; // Librería para realizar solicitudes HTTP
import config from "../../config/env.js"; // Configuración de variables de entorno

const sendToWhatsApp = async (data) => {
    const baseUrl = `https://graph.facebook.com/${config.WHATSAPP_API_VERSION}/${config.WHATSAPP_BUSINESS_PHONE_NUMBER_ID}/messages`;
    const headers = {
        Authorization: `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
    }

    try {
        const response = await axios({
            method: "POST",
            url: baseUrl,
            headers: headers,
            data,
        });
        return response.data;
    } catch (error) {
        console.error("Error al enviar el mensaje a través de la API de WhatsApp:", error.response?.data || error.message);
    }
}

export default sendToWhatsApp;
