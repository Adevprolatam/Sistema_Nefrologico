const { Router } = require('express');
const router = Router();
const Anthropic = require('@anthropic-ai/sdk');

const apiKey = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
    apiKey: apiKey
});

const PregAPi = async (entrada = '') => {
    try {
        const msg = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1000,
            messages: [
                {
                    role: 'user',
                    content: entrada
                }
            ]
        });

        return msg;
    } catch (error) {
        console.error('Error en la solicitud a la API:', error.message);
        throw error;
    }
};


// Definir la ruta para recibir la entrada y responder con el resultado de la IA
router.post('/pregunta', async (req, res) => {
    const { entrada } = req.body;
    try {
        const respuesta = await PregAPi(entrada);
        res.json({ respuesta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
