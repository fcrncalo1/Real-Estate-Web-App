const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('korisnik', {
        ime: DataTypes.STRING,
        prezime: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'korisnik'
    });
};