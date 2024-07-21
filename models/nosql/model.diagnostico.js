const mongoose = require('mongoose');

const DiagnosticoSchema = new mongoose.Schema({
    visita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visita',
        required: true
    },
    resultados: {
        type: String,
        default: "Sin respuesta de la IA"
    },
    fecha_diagnostico: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Diagnostico', DiagnosticoSchema);
