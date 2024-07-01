const models = {
    pacienteModel: require('./nosql/model.paciente'),
    enfermedadesRenalesModel: require('./nosql/model.enfermedadRenal'),
    historialMedicoModel:require('./nosql/model.historialMedico'),
    sintomasModel:require('./nosql/model.sintomas'),
    diagnosticoModel:require('./nosql/model.diagnostico')
}
module.exports = models;
