const mongoose = require('mongoose');

const EnfermedadRenalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    clasificacion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    sintomas: [{
        type: String,
        required: true
    }],
    descripcion: {
        type: String,
        required: true
    },
    tratamiento: {
        type: String,
        default: "N/A"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('EnfermedadRenal', EnfermedadRenalSchema);
