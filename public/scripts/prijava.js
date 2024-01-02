function prikaziOpcijeMenija(prijavljen) {
    var opcijeMenija = document.querySelectorAll('ul li');

    opcijeMenija.forEach(function(opcija) {
        opcija.style.display = 'none';
    });

    if (prijavljen) {
        document.getElementById('odjava').style.display = 'inline';
        document.getElementById('profil').style.display = 'inline';
        document.getElementById('nekretnine').style.display = 'inline';
        document.getElementById('detalji').style.display = 'inline';
    } else {
        document.getElementById('prijava').style.display = 'inline';
        document.getElementById('nekretnine').style.display = 'inline';
        document.getElementById('detalji').style.display = 'inline';
    }
}

function odjava() {
    prikaziOpcijeMenija(false);
}
