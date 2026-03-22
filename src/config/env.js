import dotenv from "dotenv"; // Carga de variables de entorno

// Cargamos las variables de entorno desde el archivo .env
dotenv.config({ path: ".env" });

export default {
    WHATSAPP_API_VERSION: process.env.WHATSAPP_API_VERSION,
    WHATSAPP_BUSINESS_PHONE_NUMBER_ID: process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_USER_PHONE_NUMBER: process.env.WHATSAPP_USER_PHONE_NUMBER,
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    PORT: process.env.PORT || 3000
};