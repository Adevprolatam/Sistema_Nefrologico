const {Router} = require('express');
const router = Router();
//VALIDATORS
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator');

const {
    obtenerExamenAll,
    crearExamenSangre
} = require("../controllers/examenSangre");

//Todo: Route ITEMS 
router.get("/", obtenerExamenAll);
router.post("/", [
    check('paciente', 'El ID del paciente es obligatorio y debe ser válido').isMongoId(),
    check('tipo_examen', 'El tipo de examen es obligatorio').not().isEmpty(),
    check('resultado.creatinina_serica', 'El valor de creatinina sérica es obligatorio').isNumeric(),
    check('resultado.tfg', 'El valor de TFG es obligatorio').isNumeric(),
    check('fecha_examen', 'La fecha del examen es obligatoria').isISO8601(),
    validarCampos
],crearExamenSangre);
module.exports = router;