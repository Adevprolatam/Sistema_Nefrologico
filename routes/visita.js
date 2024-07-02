const {Router} = require('express');
const router = Router();
//VALIDATORS
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator');

const {
    crearVisita,
    obtenerVisitasAll
} = require("../controllers/visita");

//Todo: Route ITEMS 
router.get("/", obtenerVisitasAll);
router.post("/", [
    check('paciente', 'El ID del paciente es obligatorio y debe ser válido').isMongoId(),
    check('sintomas', 'Debe haber al menos un síntoma asociado').isArray({ min: 1 }),
    check('signosVitales.presionArterial', 'El valor de la presión arterial es obligatorio').not().isEmpty(),
    check('signosVitales.frecuenciaCardiaca', 'El valor de la frecuencia cardíaca es obligatorio').isNumeric(),
    check('signosVitales.temperatura', 'El valor de la temperatura es obligatorio').isNumeric(),
    check('signosVitales.peso', 'El valor del peso es obligatorio').isNumeric(),
    check('signosVitales.altura', 'El valor de la altura es obligatorio').isNumeric(),
    validarCampos
],crearVisita);
module.exports = router;