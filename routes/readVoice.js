const {Router} = require('express');
const router = Router();

const {
    leerDiagnosticoByID
} = require("../controllers/leerDatos");

//Todo: Route ITEMS 
router.get("/:id", leerDiagnosticoByID);
module.exports = router;