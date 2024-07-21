const mongoose = require('mongoose');

const EnfermedadRenalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: false
    },
    clasificacion: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: false
    },
    sintomas: [{
        type: String,
        required: false
    }],
    descripcion: {
        type: String,
        required: false
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
