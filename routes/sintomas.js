const {Router} = require('express');
const router = Router();

const {
    obtenerSintomasTodos, 
    crearSintomas
} = require("../controllers/sintomas");

//Todo: Route ITEMS 
router.get("/", obtenerSintomasTodos);
router.post("/",crearSintomas);
module.exports = router;