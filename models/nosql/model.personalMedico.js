const mongoose = require('mongoose');

const PersonalMedicoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('PersonalMedico', PersonalMedicoSchema);
