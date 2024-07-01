const {Router} = require('express');
const router = Router();

const {
    obtenerPacientesTodos, 
    crearPaciente
} = require("../controllers/paciente");

//Todo: Route ITEMS 
router.get("/", obtenerPacientesTodos);
router.post("/",crearPaciente);
module.exports = router;