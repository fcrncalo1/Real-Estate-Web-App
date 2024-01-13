const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('nekretnina', {
        tip_nekretnine: DataTypes.STRING,
        naziv: DataTypes.STRING,
        kvadratura: DataTypes.INTEGER,
        cijena: DataTypes.INTEGER,
        tip_grijanja: DataTypes.STRING,
        lokacija: DataTypes.STRING,
        godina_izgradnje: DataTypes.INTEGER,
        datum_objave: DataTypes.STRING,
        opis: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'nekretnina'
    });
};