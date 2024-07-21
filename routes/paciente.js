const {Router} = require('express');
const router = Router();
//VALIDATORS
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator');


const {
    obtenerPacientesTodos,
    obtenerPacienteByID, 
    crearPaciente,
    actualizarPaciente
} = require("../controllers/paciente");

//Todo: Route Paciente

router.get("/", obtenerPacientesTodos);
router.post("/",
    [
        check('ci','La cedula es obligatoria').not().isEmpty(),
        check('nombres','El campo es obligatorio').not().isEmpty(),
        check('apellidos','El campo es obligatorio').not().isEmpty(),
        check('edad','El campo es obligatorio').isNumeric(),
        check('edad', 'La edad debe ser un entero').isInt(),
        check('genero','El campo es obligatorio ').not().isEmpty(),
        check('genero', 'El género debe ser "m", "f" o "no-specific"').isIn(['m', 'f', 'no-specific']),
        check('etnia','El campo es obligatorio').not().isEmpty(),
        //check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
crearPaciente);

router.get("/:id",obtenerPacienteByID)

//
router.post("/:id",actualizarPaciente);
module.exports = router;