const {Router} = require('express');
const router = Router();

const {
    obtenerDiagnoticosAll,
    crearDiagnostico
} = require("../controllers/diagnostico");

//Todo: Route ITEMS 
router.get("/", obtenerDiagnoticosAll);
router.post("/",crearDiagnostico);
module.exports = router;