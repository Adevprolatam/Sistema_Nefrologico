const {Router} = require('express');
const router = Router();

const {
    buscarVisitasPorPaciente
} = require("../controllers/busqueda");

//Todo: Route ITEMS 
router.get("/visitas/paciente/:identificador", buscarVisitasPorPaciente);

module.exports = router;