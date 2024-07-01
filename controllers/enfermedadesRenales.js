const {enfermedadesRenalesModel} = require('../models/index');


const obtenerPacientesTodos = async (req,res)=>{
    const {body} = req;
    const data = await enfermedadesRenalesModel.find({});
    
    res.json({
        msg:"Succesfull",
        enfermedad_Renal: data
    })
}

const crearPaciente = async (req,res)=>{
    const {body} = req;
    const data = await enfermedadesRenalesModel.create(body);

    res.json({
        msg:"Succesfull",
        data: data
    })
}

module.exports = {
    obtenerPacientesTodos, 
    crearPaciente
}



