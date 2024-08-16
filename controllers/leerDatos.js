const { diagnosticoModel } = require('../models/index');
const ObjectId = require('mongoose').Types.ObjectId;

const leerDiagnosticoByID = async (req, res) => {
    const id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID no válido'
        });
    }

    try {
        const diagnostico = await diagnosticoModel.findById(id).populate({
            path: 'visita',
            populate: {
                path: 'paciente',
                model: 'Paciente'
            }
        });

        if (!diagnostico) {
            return res.status(404).json({
                ok: false,
                msg: 'Diagnóstico no encontrado'
            });
        }

        const paciente = diagnostico.visita.paciente;
        const nombreCompleto = paciente ? `${paciente.nombres || 'Paciente'} ${paciente.apellidos || ''}` : 'Paciente';
        const diagnosticoTexto = `
        Diagnóstico del paciente ${nombreCompleto}:

        Después de analizar los parámetros proporcionados, el diagnóstico del paciente es el siguiente:

        ${diagnostico.resultados || 'No disponible'}

        Fecha del diagnóstico: ${new Date(diagnostico.fecha_diagnostico).toLocaleDateString()}

        Recomendaciones adicionales:
        ${diagnostico.recomendaciones || 'No especificadas'}`;

        res.json({
            ok: true,
            diagnosticoTexto
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    leerDiagnosticoByID
};
