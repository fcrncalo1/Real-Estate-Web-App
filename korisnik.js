const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

const Korisnik = sequelize.define('korisnik', {
    ime: Sequelize.STRING,
    prezime: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'korisnik'
});

module.exports = Korisnik;