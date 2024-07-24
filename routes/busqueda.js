const {Router} = require('express');
const router = Router();

const {
    buscarVisitasPorPaciente,
    buscarDiagnosticoPorPaciente
} = require("../controllers/busqueda");

//Todo: Route ITEMS 
router.get("/visitas/paciente/:identificador", buscarVisitasPorPaciente);
router.get("/diagnosticos/paciente/:identificador", buscarDiagnosticoPorPaciente);

module.exports = router;