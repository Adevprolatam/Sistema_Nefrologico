const { pacienteModel, visitaModel } = require('../models/index');
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

const Consultar_Historial_Clinico = async (req, res = response) => {
    var datos;
    return datos ;
}

module.exports = {
    buscarVisitasPorPaciente
};
