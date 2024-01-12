const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

const Nekretnina = sequelize.define('nekretnina', {
    tip_nekretnine: Sequelize.STRING,
    naziv: Sequelize.STRING,
    kvadratura: Sequelize.INTEGER,
    cijena: Sequelize.INTEGER,
    tip_grijanja: Sequelize.STRING,
    lokacija: Sequelize.STRING,
    godina_izgradnje: Sequelize.INTEGER,
    datum_objave: Sequelize.STRING,
    opis: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'nekretnina'
});

module.exports = Nekretnina;