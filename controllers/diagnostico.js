const {diagnosticoModel} = require('../models/index');


const obtenerDiagnoticosAll = async (req,res)=>{
    const data = await diagnosticoModel.find()
    .populate("visita", 'signosVitales paciente examenes sintomas')
    .populate("resultados.enfermedad_detectada", 'nombre tipo clasificacion sintomas'); 

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

const estadoRenal = ()=>{
    var datos ;
    return datos;
}

const Progresion_Enfermedad= ()=>{
    var datos ;
    return datos;
}
module.exports = {
    obtenerDiagnoticosAll, 
    crearDiagnostico
}



