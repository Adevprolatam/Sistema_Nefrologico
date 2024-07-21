const mongoose = require('mongoose');

const DiagnosticoSchema = new mongoose.Schema({
    visita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visita',
        required: true
    },
    resultados: {
        enfermedad_detectada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnfermedadRenal',
            required: false
        },
        tratamiento_posible: {
            nombre: {
                type: String,
                default: 'No especificado'
            },
            detalles: {
                type: String,
                default: 'No especificado'
            }
        },
        estado: {
            type: String,
            required: true,
            enum: ['Estable', 'Leve', 'Grave', 'Terminal'],
            default: 'Estable'
        },
        analisis: {
            hipertension: {
                type: Boolean,
                default: false
            },
            bajaTalla: {
                type: Boolean,
                default: false
            },
            sobrepeso: {
                type: Boolean,
                default: false
            },
            porcentajeSalud: {
                type: Number,
                default: 0.8
            },
            recomendaciones: {
                type: String,
                default: 'Sin Recomendaciones'
            },
            otros: [{
                condicion: {
                    type: String,
                    default: ''
                },
                valor: {
                    type: String,
                    default: ''
                }
            }]
        }
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
