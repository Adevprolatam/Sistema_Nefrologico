const mongoose = require('mongoose');

const ExamenSangreSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    tipo_examen: {
        type: String,
        required: true,
        default:'Sangre'
    },
    resultado: {
        creatinina_serica: {
            type: String,
            required: true
        },
        tfg: {
            type: String,
            required: true
        },
        proteina_orina: {
            type: String,
            required: false
        },
        acido_urico: {
            type: String,
            required: false
        },
        hba1c: {
            type: String,
            required: false
        },
        colesterol_total: {
            type: String,
            required: false
        },
        ldl: {
            type: String,
            required: false
        },
        hdl: {
            type: String,
            required: false
        },
        trigliceridos: {
            type: String,
            required: false
        },
        biometria_hematica: {
            globulos_rojos: {
                type: String,
                required: false
            },
            hemoglobina: {
                type: String,
                required: false
            },
            hematocrito: {
                type: String,
                required: false
            },
            plaquetas: {
                type: String,
                required: false
            }
        }
    },
    fecha_examen: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('ExamenSangre', ExamenSangreSchema);
