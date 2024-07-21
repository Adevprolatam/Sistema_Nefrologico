const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    ci: {
        type: String,
        required: true,
        unique: true
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
    tipo_sangre: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'N/A'],
        default: 'N/A'
    },    
    estado: {
        type: String,
        required: true,
        enum: ['Estable', 'Leve', 'Grave','Terminal'],
        default: 'Estable'
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
