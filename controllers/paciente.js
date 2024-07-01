const {pacienteModel} = require('../models/index');


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
    crearPaciente,
    obtenerPacienteByID
}



