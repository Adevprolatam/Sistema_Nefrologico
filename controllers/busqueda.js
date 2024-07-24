const { pacienteModel, visitaModel, diagnosticoModel } = require('../models/index');
const { response } = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const buscarVisitasPorPaciente = async (req, res = response) => {
    const { identificador } = req.params; // Identificador único del paciente (puede ser cédula o ID)
    try {
        let paciente;

        // Verifica si el identificador es un ObjectId válido
        if (ObjectId.isValid(identificador)) {
            // Intenta buscar por ID primero
            paciente = await pacienteModel.findById(identificador);
        }

        // Si no encuentra por ID, o si el identificador no es un ObjectId válido, busca por cédula
        if (!paciente) {
            paciente = await pacienteModel.findOne({ ci: identificador });
        }

        // Si aún así no encuentra ningún paciente, devuelve un mensaje de error
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún paciente con el identificador proporcionado'
            });
        }

        // Buscar las visitas del paciente encontrado
        const visitas = await visitaModel.find({ paciente: paciente._id })
            .populate('paciente', 'ci nombres apellidos')
            .populate('sintomas', 'nombre descripcion createdAt updatedAt')
            .populate('examenes.sangre', 'tipo resultado')
            .exec();

        res.json({
            ok: true,
            visitas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la búsqueda de visitas por paciente'
        });
    }
};

const buscarDiagnosticoPorPaciente = async (req, res = response) => {
    const { identificador } = req.params; 
    try {
        let paciente = await pacienteModel.findOne({ ci: identificador });

        if (!paciente) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún paciente con la cedula proporcionado'
            });
        }

        // Obtener todas las visitas del paciente
        const visitas = await visitaModel.find({ paciente: paciente._id });

        if (!visitas.length) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron visitas para el paciente con la cedula proporcionado'
            });
        }

        // Obtener diagnósticos basados en las visitas
        const diagnosticos = await diagnosticoModel.find({ visita: { $in: visitas.map(visita => visita._id) } })
            .populate('visita', 'signosVitales fechaVisita sintomas')
            .exec();

        if (!diagnosticos.length) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron diagnósticos para el paciente con el identificador proporcionado'
            });
        }

        res.json({
            ok: true,
            diagnosticos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la búsqueda de diagnósticos por paciente'
        });
    }
}



const Consultar_Historial_Clinico = async (req, res = response) => {
    var datos;
    return datos ;
}

module.exports = {
    buscarVisitasPorPaciente,
    buscarDiagnosticoPorPaciente
};
