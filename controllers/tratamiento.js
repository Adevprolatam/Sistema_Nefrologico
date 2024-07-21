const { diagnosticoModel, pacienteModel, enfermedadRenalModel, visitaModel } = require('../models/index');
const procesarConIA = require('../services/iaService'); 

const obtenerDiagnoticosAll = async (req, res) => {
    try {
        const data = await diagnosticoModel.find()
            .populate("visita", 'signosVitales paciente examenes sintomas')
            .populate("resultados.enfermedad_detectada", 'nombre tipo clasificacion sintomas'); 

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

    console.log("ID de visita:", visitaId);

    try {
        // Recupera los datos de la visita
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

        // Obtener nombres de los síntomas
        const sintomasNombres = visita.sintomas.map(sintoma => ({
            _id: sintoma._id,
            nombre: sintoma.nombre,
            descripcion: sintoma.descripcion
        }));

        // Obtener resultados de los exámenes de sangre
        const examenesSangre = visita.examenes.sangre.resultado;

        const datosIA = {
            signosVitales: visita.signosVitales,
            examenes: {
                sangre: {
                    resultado: examenesSangre,
                    _id: visita.examenes.sangre._id,
                    paciente: visita.examenes.sangre.paciente,
                    tipo_examen: visita.examenes.sangre.tipo_examen,
                    fecha_examen: visita.examenes.sangre.fecha_examen
                }
            },
            sintomas: sintomasNombres
        };

        console.log("Datos enviados a la IA:", datosIA);

        // Enviar los datos a la IA
        const respuestaIA = await procesarConIA(datosIA);

        console.log("Respuesta de la IA:", respuestaIA);

        // Verificar si la respuesta es válida y parseable
        let parsedRespuestaIA;
        try {
            parsedRespuestaIA = JSON.parse(respuestaIA);
        } catch (parseError) {
            console.error("Error al parsear la respuesta de la IA:", parseError.message);
            return res.status(500).json({
                msg: "Error al procesar la respuesta de la IA",
                error: parseError.message
            });
        }

        console.log("Respuesta IA parseada:", parsedRespuestaIA);

        // Verificar si la enfermedad diagnosticada existe
        let enfermedad = await enfermedadRenalModel.findOne({ nombre: parsedRespuestaIA.enfermedad_detectada.nombre });

        if (!enfermedad) {
            console.log("Enfermedad no encontrada, creando nueva enfermedad:", parsedRespuestaIA.enfermedad_detectada);
            enfermedad = await enfermedadRenalModel.create(parsedRespuestaIA.enfermedad_detectada);
        } else {
            console.log("Enfermedad existente:", enfermedad);
        }

        // Actualizar el estado del paciente
        console.log("Actualizando estado del paciente:", visita.paciente._id, "Estado:", parsedRespuestaIA.estado);
        await pacienteModel.findByIdAndUpdate(visita.paciente._id, { estado: parsedRespuestaIA.estado });

        // Crear el diagnóstico
        const nuevoDiagnostico = await diagnosticoModel.create({
            visita: visitaId,
            resultados: {
                enfermedad_detectada: enfermedad._id,
                tratamiento_posible: parsedRespuestaIA.tratamiento_posible,
                estado: parsedRespuestaIA.estado,
                analisis: parsedRespuestaIA.analisis
            }
        });

        console.log("Nuevo diagnóstico creado:", nuevoDiagnostico);

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
