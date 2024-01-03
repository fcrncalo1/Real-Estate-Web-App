const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
}));

async function ucitajKorisnike() {
    try {
        const data = await fs.promises.readFile('data/korisnici.json', 'utf8');
        const korisnici = JSON.parse(data);
        return korisnici;
    } catch (error) {
        console.error('Greška prilikom čitanja korisnika:', error);
        throw error;
    }
}

async function ucitajNekretnine() {
    try {
        const data = await fs.promises.readFile('data/nekretnine.json', 'utf8');
        const nekretnine = JSON.parse(data);
        return nekretnine;
    } catch (error) {
        console.error('Greška prilikom čitanja nekretnina:', error);
        throw error;
    }
}

app.get('/:pageName.html', (req, res) => {

    const pageName = req.params.pageName;

    if (pageName === 'prijava' || pageName === 'meni') {
        return res.sendFile(path.join(__dirname, 'public/html', `${pageName}.html`));
    }

    if (!req.session.username) {
        return res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
    
    res.sendFile(path.join(__dirname, 'public/html', `${pageName}.html`));
});

app.post('/login', (req, res) => {
    fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Greška prilikom čitanja korisnika:', err);
            return;
        }
        const korisnici = JSON.parse(data);
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
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
});

app.get('/korisnik', (req, res) => {
    if (req.session.username) {
        fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Greška prilikom čitanja korisnika:', err);
                return;
            }
            const korisnici = JSON.parse(data);
            const korisnik = korisnici.find(k => k.username === req.session.username);
            res.status(200).json(korisnik);
        });      
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.post('/upit', async (req, res) => {
    if (req.session.username) {
        const { nekretnina_id, tekst_upita } = req.body;
        const korisnici = await ucitajKorisnike();
        const nekretnine = await ucitajNekretnine();
        console.log(korisnici,nekretnine);
        const korisnik = korisnici.find(k => k.username === req.session.username);
        const nekretnina = nekretnine.find(n => n.id === nekretnina_id);

        if (!nekretnina) {
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
            return;
        }

        nekretnina.upiti.push({ korisnik_id: korisnik.id, tekst_upita: tekst_upita });
        
        fs.writeFile('data/nekretnine.json', JSON.stringify(nekretnine, null, 2), (err) => {
            if (err)
              console.log(err);
            else {
              res.status(200).json({ poruka: 'Upit je uspješno dodan' });
            }
        });
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.put('/korisnik', async (req, res) => {
    if (req.session.username) {
        const { ime, prezime, username, password } = req.body;

        const korisnici = await ucitajKorisnike();
        const indeks = korisnici.findIndex(k => k.username === req.session.username);

        if (indeks !== -1) {
            if (ime) korisnici[indeks].ime = ime;
            if (prezime) korisnici[indeks].prezime = prezime;
            if (username) korisnici[indeks].username = username;
            if (password) {
                bcrypt.hash(password, 10, function(err, hash) {
                    korisnici[indeks].password = hash;
                    fs.writeFile('data/korisnici.json', JSON.stringify(korisnici, null, 2), (err) => {
                        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                    });
                });
            }
            else {
                fs.writeFile('data/korisnici.json', JSON.stringify(korisnici, null, 2), (err) => {
                    res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                });
            }      
        }

    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/nekretnine', (req, res) => {
    fs.readFile('data/nekretnine.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Greška prilikom čitanja nekretnina:', err);
            return;
        }
        const nekretnine = JSON.parse(data);
        res.status(200).json(nekretnine);
    });    
});

app.listen(port, () => {
    console.log(`Server pokrenut na http://localhost:${port}`);
});
