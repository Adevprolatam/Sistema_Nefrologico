const {examenSangreModel} = require('../models/index');


const obtenerExamenAll = async (req,res)=>{
    const data = await examenSangreModel.find({});
    //.populate("paciente", 'nombre apellidos edad genero')
    //.populate("enfermedad_detectada", 'nombre clasificacion sintomas'); 

    res.json({
        msg: "Successful",
        examenSangre: data
    });
}

const crearExamenSangre = async (req,res)=>{
    const {body} = req;
    const data = await examenSangreModel.create(body);

    res.json({
        msg:"Succesfull",
        examen: data
    })
}

module.exports = {
    obtenerExamenAll,
    crearExamenSangre
}



