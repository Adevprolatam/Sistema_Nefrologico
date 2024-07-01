const {diagnosticoModel} = require('../models/index');


const obtenerDiagnoticosAll = async (req,res)=>{
    const data = await diagnosticoModel.find()
    .populate("paciente", 'nombre apellidos edad genero')
    .populate("enfermedad_detectada", 'nombre clasificacion sintomas'); 

    res.json({
        msg: "Successful",
        diagnostico: data
    });
}

const crearDiagnostico = async (req,res)=>{
    const {body} = req;
    const data = await diagnosticoModel.create(body);

    res.json({
        msg:"Succesfull",
        user: data
    })
}

module.exports = {
    obtenerDiagnoticosAll, 
    crearDiagnostico
}



