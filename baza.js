const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"localhost",dialect:"mysql",logging:false});
const db={};

// Moj drugi komentar
// Moj komentar
db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.nekretnina = sequelize.import(__dirname+'/nekretnina.js');
db.korisnik = sequelize.import(__dirname+'/korisnik.js');
db.upit = sequelize.import(__dirname+'/upit.js');

//relacije
// Veza 1-n vise knjiga se moze nalaziti u biblioteci
db.nekretnina.hasMany(db.upit, { foreignKey: 'nekretnina_id', as: 'upiti' });
db.korisnik.hasMany(db.upit, { foreignKey: 'korisnik_id', as: 'upiti' });
db.upit.belongsTo(db.korisnik, { foreignKey: 'korisnik_id', as: 'korisnik' });

module.exports=db;