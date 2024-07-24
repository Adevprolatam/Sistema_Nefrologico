const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config(); 

const apiKey = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
    apiKey: apiKey
});

const procesarConIA = async (datos) => {
    try {
        const datosJson = JSON.stringify(datos);
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

        console.log("Respuesta completa de la IA:", response);

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
