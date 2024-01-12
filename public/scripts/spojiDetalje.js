// detalji.js
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const tip_nekretnine = urlParams.get('tip_nekretnine');
    const naziv = urlParams.get('naziv');
    const kvadratura = urlParams.get('kvadratura');
    const cijena = urlParams.get('cijena');
    const tip_grijanja = urlParams.get('tip_grijanja');
    const lokacija = urlParams.get('lokacija');
    const godina_izgradnje = urlParams.get('godina_izgradnje');
    const datum_objave = urlParams.get('datum_objave');
    const opis = urlParams.get('opis');

    let osnovnoDiv = document.getElementById('osnovno');
    osnovnoDiv.innerHTML = "";
    osnovnoDiv.innerHTML = `
        <img src="../img/kuca1.jpg" alt="Nekretnina">
        <p><strong>Naziv</strong>: ${naziv}</p>
        <p><strong>Kvadratura</strong>: ${kvadratura}m²</p>
        <p><strong>Cijena</strong>: ${cijena}KM</p>
    `;
    let detaljiDiv = document.getElementById('detalji');
    detaljiDiv.innerHTML = "";
    detaljiDiv.innerHTML = `
        <h3>DETALJI</h3>
        <div class="info-kolona-1">
            <p><strong>Tip grijanja</strong>: ${tip_grijanja}</p>
            <p><strong>Lokacija</strong>: ${lokacija}</p>
        </div>
        <div class="info-kolona-2">
            <p><strong>Godina izgradnje</strong>: ${godina_izgradnje}</p>
            <p><strong>Datum objave</strong>: ${datum_objave}</p>
        </div>
        <p class="opis"><strong>Opis</strong>: ${opis}</p>
    `;
    let upitiDiv = document.getElementById('upiti');
    upitiDiv.innerHTML = "";
    upitiDiv.innerHTML = "<h3>UPITI</h3>";
});
