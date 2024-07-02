const mongoose = require('mongoose');

const VisitaSchema = new mongoose.Schema({
    paciente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paciente', 
        required: true 
    },
    fechaVisita: { 
        type: Date, 
        default: Date.now 
    },
    signosVitales: {
        presionArterial: String,
        frecuenciaCardiaca: Number,
        temperatura: Number,
        peso: Number,
        altura:Number
    },
    sintomas:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sintoma', 
        required: true 
    }],
    examenes: {
        sangre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExamenSangre', 
            required: false   
         } 
    },
    diagnostico: {
        enfermedad: String,
        clasificacion: String,
        tratamiento: String
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Visita', VisitaSchema);
