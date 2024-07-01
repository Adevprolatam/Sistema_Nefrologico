const mongoose = require('mongoose');

const DiagnosticoSchema = new mongoose.Schema({ 
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    enfermedad_detectada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnfermedadRenal',
        required: true
    },
    fecha_diagnostico: {
        type: Date,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Diagnostico', DiagnosticoSchema);
