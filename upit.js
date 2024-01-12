const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

const Upit = sequelize.define('upit', {
    korisnik_id: Sequelize.INTEGER,
    tekst_upita: Sequelize.STRING,
    nekretnina_id: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'upit'
});

module.exports = Upit;