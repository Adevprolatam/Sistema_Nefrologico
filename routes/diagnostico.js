const {Router} = require('express');
const router = Router();

const {
    obtenerDiagnoticosAll,
    crearDiagnosticoDesdeVisita,
    obtenerDiagnosticoByID
} = require("../controllers/tratamiento");

//Todo: Route ITEMS 
router.get("/", obtenerDiagnoticosAll);
router.post("/",crearDiagnosticoDesdeVisita);
router.get("/:id",obtenerDiagnosticoByID);
module.exports = router;