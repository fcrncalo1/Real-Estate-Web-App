function prikaziOpcijeMenija(prijavljen) {
    var opcijeMenija = document.querySelectorAll('ul li');

    opcijeMenija.forEach(function(opcija) {
        opcija.style.display = 'none';
    });

    if (prijavljen) {
        document.getElementById('odjava').style.display = 'inline';
        document.getElementById('profil').style.display = 'inline';
        document.getElementById('nekretnine').style.display = 'inline';
    } else {
        document.getElementById('prijava').style.display = 'inline';
        document.getElementById('nekretnine').style.display = 'inline';
    }
}

function odjava() {
    PoziviAjax.postLogout(function(error, data) {
        prikaziOpcijeMenija(false);
        document.querySelector('iframe[name="sadrzajFrame"]').src = "prijava.html";
    })    
}

PoziviAjax.getKorisnik((error, data) => {
    if (error) {
        prikaziOpcijeMenija(false);
        document.querySelector('iframe[name="sadrzajFrame"]').src = "prijava.html";
    }
    else {
        prikaziOpcijeMenija(true);
        document.querySelector('iframe[name="sadrzajFrame"]').src = "nekretnine.html";    
    }
});