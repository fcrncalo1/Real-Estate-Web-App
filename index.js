const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const db = require('./baza.js');
const Korisnik = require('./korisnik.js');
const Nekretnina = require('./nekretnina.js');
const Upit = require('./upit.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
}));

app.get('/:pageName.html', (req, res) => {

    const pageName = req.params.pageName;

    if (pageName === 'prijava' || pageName === 'meni') {
        return res.sendFile(path.join(__dirname, 'public/html', `${pageName}.html`));
    }

    if (!req.session.username && pageName === 'profil') {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
    
    res.sendFile(path.join(__dirname, 'public/html', `${pageName}.html`));
});

app.post('/login', async (req, res) => {     
    const korisnici = await db.korisnik.findAll({
        attributes: ['ime','prezime', 'username', 'password']
    });
    const { username, password } = req.body;
    const korisnik = korisnici.find(k => k.username === username);
    if (korisnik) {
        bcrypt.compare(password, korisnik.password, (err, result) => {
            if (result) {
                req.session.username = username;
                res.status(200).json({ poruka: 'Uspješna prijava' });
            } else {
                res.status(401).json({ greska: 'Neuspješna prijava' });
            }
        });
    } else {
        res.status(401).json({ greska: 'Neuspješna prijava' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
});

app.get('/korisnik', async (req, res) => {
    if (req.session.username) {
        const korisnici = await db.korisnik.findAll({
            attributes: ['ime','prezime', 'username', 'password']
        });
        const korisnik = korisnici.find(k => k.username === req.session.username);
        res.status(200).json(korisnik);    
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.post('/upit', async (req, res) => {
    if (req.session.username) {
        const { nekretnina_id, tekst_upita } = req.body;
        const korisnici = await db.korisnik.findAll({
            attributes: ['id','ime','prezime', 'username', 'password']
        });
        const nekretnine = await db.nekretnina.findAll({
            attributes: ['id','tip_nekretnine','naziv','kvadratura', 'cijena','tip_grijanja','lokacija','godina_izgradnje','datum_objave','opis']
        });
        const korisnik = korisnici.find(k => k.username === req.session.username);
        const nekretnina = nekretnine.find(n => n.id === nekretnina_id);
        if (!nekretnina) {
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
            return;
        }
        
        db.upit.create({
            "korisnik_id": korisnik.id,
            "tekst_upita": tekst_upita,
            "nekretnina_id": nekretnina_id
        })
        .then(() => {
            res.status(200).json({ poruka: 'Upit je uspješno dodan' });
        })
        .catch((error) => {
            console.error('Greska u ubacivanju reda:', error);
        });
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.put('/korisnik', async (req, res) => {
    if (req.session.username) {
        const { ime, prezime, username, password } = req.body;

        const korisnici = await db.korisnik.findAll({
            attributes: ['id','ime','prezime', 'username', 'password']
        });
        const indeks = korisnici.findIndex(k => k.username === req.session.username);

        if (indeks !== -1) {
            const updatedValues = {
                ime: korisnici[indeks].ime,
                prezime: korisnici[indeks].prezime,
                username: korisnici[indeks].username,
                password: korisnici[indeks].password,
            };
            if (ime) updatedValues.ime = ime;
            if (prezime) updatedValues.prezime = prezime;
            if (username) updatedValues.username = username;
            if (password) {
                bcrypt.hash(password, 10, function(err, hash) {
                    updatedValues.password = hash;
                    db.korisnik.update(updatedValues, {
                        where: {
                            id: indeks+1
                        }
                    })
                    .then((result) => {
                        if (result[0] > 0) {
                            console.log(`Record with id ${indeks+1} updated successfully.`);
                            res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                        } else {
                            console.log(`No record found with id ${indeks+1}.`);
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating record:', error);
                    });
                });
            }
            else {
                db.korisnik.update(updatedValues, {
                    where: {
                        id: indeks+1
                    }
                })
                .then((result) => {
                    if (result[0] > 0) {
                        console.log(`Record with id ${indeks+1} updated successfully.`);
                        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                    } else {
                        console.log(`No record found with id ${indeks+1}.`);
                    }
                })
                .catch((error) => {
                    console.error('Error updating record:', error);
                });
            }      
        }

    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/nekretnine', async (req, res) => {
    const nekretnine = await db.nekretnina.findAll({
        attributes: ['id','tip_nekretnine','naziv','kvadratura', 'cijena','tip_grijanja','lokacija','godina_izgradnje','datum_objave','opis']
    });
    res.status(200).json(nekretnine);  
});

app.get('/nekretnina/:id', async (req, res) => {
    const nekretnina_id = req.params.id;
    const nekretnina = await db.nekretnina.findOne({
        attributes: ['id', 'tip_nekretnine', 'naziv', 'kvadratura', 'cijena', 'tip_grijanja', 'lokacija', 'godina_izgradnje', 'datum_objave', 'opis'],
        include: [{
            model: db.upit,
            attributes: ['id', 'tekst_upita'],
            include: {
                model: db.korisnik,
                attributes: ['id', 'ime', 'prezime', 'username'],
                as: 'korisnik'
            },
            as: 'upiti',
            where: { nekretnina_id: nekretnina_id }
        }],
        where: {
            id: nekretnina_id
        }
    });
    
    if(nekretnina)
        res.status(200).json(nekretnina);
    else
        res.status(400).json( { greska:`Nekretnina sa id-em ${nekretnina_id} ne postoji` } );
});

app.post('/marketing/nekretnine', (req, res) => {
    const { nizNekretnina } = req.body;
    res.sendStatus(200);
});

app.post('/marketing/nekretnina/:id', (req, res) => {
    const { id } = req.params;
    res.sendStatus(200);
});

app.post('/marketing/osvjezi', (req, res) => {
    const { nizNekretnina } = req.body;
    res.status(200).json();
});

app.listen(port, () => {
    console.log(`Server pokrenut na http://localhost:${port}`);
});
