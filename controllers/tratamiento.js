const { diagnosticoModel, pacienteModel, enfermedadRenalModel, visitaModel } = require('../models/index');
const procesarConIA = require('../services/iaService'); 

const obtenerDiagnoticosAll = async (req, res) => {
    try {
        const data = await diagnosticoModel.find()
            .populate("visita", 'signosVitales paciente examenes sintomas');

        res.json({
            msg: "Successful",
            diagnostico: data
        });
    } catch (error) {
        console.error("Error al obtener los diagnósticos:", error.message);
        res.status(500).json({
            msg: "Error al obtener los diagnósticos",
            error: error.message
        });
    }
};

const crearDiagnosticoDesdeVisita = async (req, res) => {
    const { visita: visitaId } = req.body;

    //console.log("ID de visita:", visitaId);

    try {
        const visita = await visitaModel.findById(visitaId)
            .populate("paciente")
            .populate({
                path: "examenes.sangre",
                populate: {
                    path: "resultado.biometria_hematica"
                }
            })
            .populate({
                path: "sintomas",
                select: "nombre descripcion"
            });

        if (!visita) {
            console.log("Visita no encontrada para el ID:", visitaId);
            return res.status(404).json({ msg: 'Visita no encontrada' });
        }

        console.log("Datos de visita:", visita);

        // Verificar y asegurar que `sintomas` no sea null y tiene datos
        const sintomasNombres = visita.sintomas && visita.sintomas.length > 0
            ? visita.sintomas.map(sintoma => ({
                _id: sintoma._id,
                nombre: sintoma.nombre,
                descripcion: sintoma.descripcion
            }))
            : [];

        // Verificar si `examenes.sangre` y `examenes.sangre.resultado` están definidos
        const examenesSangre = visita.examenes.sangre && visita.examenes.sangre.resultado
            ? visita.examenes.sangre.resultado
            : [];

        const datosIA = {
            signosVitales: visita.signosVitales || {},  // Asegurarse de que sea un objeto vacío si no está disponible
            examenes: {
                sangre: {
                    resultado: examenesSangre,
                    _id: visita.examenes.sangre ? visita.examenes.sangre._id : null,
                    paciente: visita.examenes.sangre ? visita.examenes.sangre.paciente : null,
                    tipo_examen: visita.examenes.sangre ? visita.examenes.sangre.tipo_examen : null,
                    fecha_examen: visita.examenes.sangre ? visita.examenes.sangre.fecha_examen : null
                }
            },
            sintomas: sintomasNombres
        };

        //console.log("Datos enviados a la IA:", datosIA);

        const respuestaIA = await procesarConIA(datosIA);

        //console.log("Respuesta de la IA:", respuestaIA);

        // Crear el nuevo diagnóstico con la respuesta de la IA
        const nuevoDiagnostico = await diagnosticoModel.create({
            visita: visitaId,
            resultados: respuestaIA || 'No se obtuvo respuesta de la IA'  // Manejo de caso cuando no hay respuesta
        });

        //console.log("Nuevo diagnóstico creado:", nuevoDiagnostico);

        res.json({
            msg: "Successful",
            diagnostico: nuevoDiagnostico
        });
    } catch (error) {
        console.error("Error al crear el diagnóstico:", error.message);
        res.status(500).json({
            msg: "Error al crear el diagnóstico",
            error: error.message
        });
    }
};

module.exports = {
    obtenerDiagnoticosAll, 
    crearDiagnosticoDesdeVisita
};
