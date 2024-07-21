const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const apiKey = process.env.ANTHROPIC_API_KEY;

// Crear una instancia del cliente de Anthropic
const anthropic = new Anthropic({
    apiKey: apiKey
});

// Función para procesar datos con la IA
const procesarConIA = async (datos) => {
    try {
        // Convertir datos a una cadena JSON
        const datosJson = JSON.stringify(datos);

        // Llamada a la API usando el método correcto
        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1000,
            temperature: 0.6,
            messages: [
                {
                    role: 'user',
                    content: `Diagnostica al paciente con los siguientes parámetros: ${datosJson}`
                }
            ]
        });

        // Imprimir la respuesta completa para depuración
        console.log("Respuesta completa de la IA:", response);

        // Verificar y retornar el contenido de la respuesta
        if (response.content && response.content[0] && response.content[0].text) {
            return response.content[0].text;
        } else {
            throw new Error('Respuesta de la IA en formato inesperado.');
        }
    } catch (error) {
        console.error('Error al comunicarse con la IA:', error.message);
        throw new Error('Error al comunicarse con la IA');
    }
};


module.exports = procesarConIA;
