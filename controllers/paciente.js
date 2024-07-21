const {pacienteModel} = require('../models/index');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const obtenerPacientesTodos = async (req,res)=>{
    const {body} = req;
    const data = await pacienteModel.find({});
    
    res.json({
        msg:"Succesfull",
        user: data
    })
}

const obtenerPacienteByID = async(req, res) => {

    const id = req.params.id;

    try {
        const paciente = await pacienteModel.findById(id)
        res.json({
            ok: true,
            paciente
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

//REGISTRAR PACIENTE
const crearPaciente = async (req, res) => {
    const { body } = req;

    try {
        const registroExistente = await Verificar_Registro(body.ci);
        if (registroExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente con esta cédula ya está registrado'
            });
        }

        const data = await pacienteModel.create(body);

        res.json({
            msg: "Succesfull",
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

//VERIFICAR SI EXISTE PACIENTE
const Verificar_Registro = async (ci) => {
    try {
        const existePaciente = await pacienteModel.findOne({ ci: ci });
        return existePaciente !== null;
    } catch (error) {
        console.log(error);
        throw new Error('Error al verificar el registro');
    }
}
//ACTUALIZAR DATOS
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
module.exports = {
    obtenerPacientesTodos, 
    crearPaciente,
    obtenerPacienteByID, 
    actualizarPaciente
}



