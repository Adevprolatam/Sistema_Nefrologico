const mongoose = require('mongoose');

const ExamenLaboratorioSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    tipo_examen: {
        type: String,
        required: true
    },
    resultado: {
        creatinina_serica: {
            type: Number,
            required: true
        },
        tfg: {
            type: Number,
            required: true
        },
        proteina_orina: {
            type: Number,
            required: false
        },
        acido_urico: {
            type: Number,
            required: false
        },
        hba1c: {
            type: Number,
            required: false
        },
        colesterol_total: {
            type: Number,
            required: false
        },
        ldl: {
            type: Number,
            required: false
        },
        hdl: {
            type: Number,
            required: false
        },
        trigliceridos: {
            type: Number,
            required: false
        },
        biometria_hematica: {
            globulos_rojos: {
                type: Number,
                required: false
            },
            hemoglobina: {
                type: Number,
                required: false
            },
            hematocrito: {
                type: Number,
                required: false
            },
            plaquetas: {
                type: Number,
                required: false
            }
        }
    },
    fecha_examen: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('ExamenLaboratorio', ExamenLaboratorioSchema);
