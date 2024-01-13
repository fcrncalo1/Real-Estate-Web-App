const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('upit', {
        korisnik_id: DataTypes.INTEGER,
        tekst_upita: DataTypes.STRING,
        nekretnina_id: DataTypes.INTEGER
    }, {
        timestamps: false,
        tableName: 'upit'
    });
};