const {Router} = require('express');
const router = Router();

const {
    obtenerPacientesTodos, 
    crearPaciente
} = require("../controllers/enfermedadesRenales");

//Todo: Route ITEMS 
router.get("/", obtenerPacientesTodos);
router.post("/",crearPaciente);
module.exports = router;