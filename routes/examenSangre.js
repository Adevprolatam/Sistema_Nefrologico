const { Router } = require('express');
const router = Router();
// VALIDATORS
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const {
    obtenerExamenAll,
    crearExamenSangre
} = require("../controllers/examenSangre");

// Route ITEMS 
router.get("/", obtenerExamenAll);
router.post("/", [
    check('paciente', 'El ID del paciente es obligatorio y debe ser válido').isMongoId(),
    check('resultado.tfg', 'El valor de TFG es obligatorio').not().isEmpty(),
    check('resultado.creatinina_serica', 'El valor de la creatinina sérica es obligatorio').not().isEmpty(),
    validarCampos
], crearExamenSangre);

module.exports = router;
