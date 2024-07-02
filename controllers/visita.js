const {visitaModel} = require('../models/index');


const obtenerVisitasAll = async (req,res)=>{
    try {
        const data = await visitaModel.find()
        .populate('sintomas', 'nombre') 
        .populate('examenes.sangre', 'tipo_examen resultado fecha_examen');  
        res.json({
            msg: "Successful",
            visitas: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching visits", error: error.message });
    }
}

const crearVisita = async (req,res)=>{
    const {body} = req;
    const data = await visitaModel.create(body);

    res.json({
        msg:"Succesfull",
        visita: data
    })
}

module.exports = {
    obtenerVisitasAll,
    crearVisita
}



