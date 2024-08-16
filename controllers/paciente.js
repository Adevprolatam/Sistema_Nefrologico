const { pacienteModel } = require('../models/index');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Obtener todos los pacientes
const obtenerPacientesTodos = async (req, res) => {
    try {
        const data = await pacienteModel.find({});
        res.json({
            msg: "Success",
            user: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Obtener paciente por ID
const obtenerPacienteByID = async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID no válido'
        });
    }

    try {
        const paciente = await pacienteModel.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                msg: 'Paciente no encontrado'
            });
        }
        res.json({
            ok: true,
            paciente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Registrar paciente
const crearPaciente = async (req, res) => {
    const { body } = req;
    const { ci } = body;

    // Validar que ci sea un número de exactamente 10 dígitos
    if (!/^\d{10}$/.test(ci)) {
        return res.status(400).json({
            ok: false,
            msg: 'El número de cédula debe ser un número de exactamente 10 dígitos'
        });
    }

    try {
        const registroExistente = await Verificar_Registro(ci);
        if (registroExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente con esta cédula ya está registrado'
            });
        }

        const data = await pacienteModel.create(body);
        res.json({
            msg: "Success",
            user: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Verificar si existe paciente
const Verificar_Registro = async (ci) => {
    try {
        const existePaciente = await pacienteModel.findOne({ ci: ci });
        return existePaciente !== null;
    } catch (error) {
        console.log(error);
        throw new Error('Error al verificar el registro');
    }
}

// Actualizar datos del paciente
const actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const { body } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID no válido'
        });
    }

    try {
        const paciente = await pacienteModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                msg: 'Paciente no encontrado'
            });
        }
        res.json({
            ok: true,
            msg: "Paciente actualizado correctamente",
            paciente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const borrarPaciente = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const paciente = await pacienteModel.findById( id );

        if ( !paciente ) {
            return res.status(404).json({
                ok: true,
                msg: 'Paciente no encontrado por id',
            });
        }

        await pacienteModel.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Paciente borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
module.exports = {
    obtenerPacientesTodos,
    crearPaciente,
    obtenerPacienteByID,
    actualizarPaciente,
    borrarPaciente
};
