const {Router} = require('express');
const router = Router();

const {
    obtenerDiagnoticosAll,
    crearDiagnosticoDesdeVisita
} = require("../controllers/tratamiento");

//Todo: Route ITEMS 
router.get("/", obtenerDiagnoticosAll);
router.post("/",crearDiagnosticoDesdeVisita);
module.exports = router;