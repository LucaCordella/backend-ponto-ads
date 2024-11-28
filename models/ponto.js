const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ponto = sequelize.define('Ponto', {
    id_ponto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    justificativa: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    anexo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    passado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    dataHora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('entrada', 'saida', 'intervalo', 'volta'),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Usuarios",
            key: "id_usuario"
        }
    }
},{
    timestamps: true
});

module.exports = Ponto;