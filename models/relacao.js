const Usuario = require('../models/usuario');
const Ponto = require('../models/ponto'); 


function relacao() {
    // Um usuário pode ter muitos Pontos
    Usuario.hasMany(Ponto);
    // Um ponto pertence sempre a um único usuário
    Ponto.belongsTo(Usuario);
}

module.exports = relacao;
