const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a la skill de diagnóstico. ¿Qué deseas hacer?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DiagnosticoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DiagnosticoIntent';
    },
    async handle(handlerInput) {
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();

        const idDiagnostico = sessionAttributes['diagnosticoId']; 
        let diagnosticoTexto = '';

        try {
            const response = await fetch(`http://localhost:3200/api/readVoice/${idDiagnostico}`);
            const data = await response.json();
            
            diagnosticoTexto = data.diagnosticoTexto || 'No pude encontrar el diagnóstico.';
        } catch (error) {
            console.error('Error al obtener el diagnóstico:', error);
            diagnosticoTexto = 'Ocurrió un error al obtener el diagnóstico.';
        }

        return handlerInput.responseBuilder
            .speak(diagnosticoTexto)
            .getResponse();
    }
};


const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Lo siento, hubo un problema procesando tu solicitud.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const skillBuilder = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DiagnosticoIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler);

module.exports = {
    handler: skillBuilder.lambda()
};
