import dotenv from "dotenv"; // Carga de variables de entorno

// Cargamos las variables de entorno desde el archivo .env.local
dotenv.config({ path: ".env.local" });

export default {
    API_VERSION: process.env.API_VERSION,
    WHATSAPP_BUSINESS_PHONE_NUMBER_ID: process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    WHATSAPP_USER_PHONE_NUMBER: process.env.WHATSAPP_USER_PHONE_NUMBER,
    WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN,
    PORT: process.env.PORT || 3000
};