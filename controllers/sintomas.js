const {sintomasModel} = require('../models/index');


const obtenerSintomasTodos = async (req,res)=>{
    const {body} = req;
    const data = await sintomasModel.find({});
    
    res.json({
        msg:"Succesfull",
        sintomas: data
    })
}

const crearSintomas = async (req,res)=>{
    const {body} = req;
    const data = await sintomasModel.create(body);

    res.json({
        msg:"Succesfull",
        data: data
    })
}

module.exports = {
    obtenerSintomasTodos, 
    crearSintomas
}

