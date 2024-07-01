const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    ci: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        enum: ['m', 'f', 'no-specific'],
        required: true,
        default: 'no-specific'
    },
    etnia: {
        type: String,
        required: true,
        default: 'No espeficado'
    },
    antecedentesMedicos: {
        type: [{
            enfermedad: String,
            descripcion: String,
            fechaDiagnostico: Date
        }],
        required: false,
        default: [{
            enfermedad: "Sin antecedentes",
            descripcion: "",
            fechaDiagnostico: null
        }]
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Paciente', PacienteSchema);
