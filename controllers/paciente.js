const {pacienteModel} = require('../models/index');


const obtenerPacientesTodos = async (req,res)=>{
    const {body} = req;
    const data = await pacienteModel.find({});
    
    res.json({
        msg:"Succesfull",
        user: data
    })
}

const crearPaciente = async (req,res)=>{
    const {body} = req;
    const data = await pacienteModel.create(body);

    res.json({
        msg:"Succesfull",
        user: data
    })
}

module.exports = {
    obtenerPacientesTodos, 
    crearPaciente
}



