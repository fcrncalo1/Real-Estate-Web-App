function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
    const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    // iscrtavanje elemenata u divReferenca element
    // Obrisi postojeci sadrzaj
    divReferenca.innerHTML = "";
    if (filtriraneNekretnine.length === 0) {
        divReferenca.innerHTML = "Nema dostupnih nekretnina za odabrani tip.";
    } else {
    filtriraneNekretnine.forEach(nekretnina => {
      const nekretninaDiv = document.createElement("div");
      nekretninaDiv.classList.add("grid-item");
      nekretninaDiv.innerHTML = `
        <img src="../img/stan2.jpg" alt="Stan 2">
        <h3>${nekretnina.naziv}</h3>
        <p>Kvadratura: ${nekretnina.kvadratura} m²</p>
        <p class="cijena">Cijena: ${nekretnina.cijena} KM</p>
        <button>Detalji</button>
      `;
      divReferenca.appendChild(nekretninaDiv);
    });
  }
}
const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

PoziviAjax.getNekretnine(function(error, data) {
  if (error) {
    console.error('Greška pri dohvatu nekretnina:', error);
    return;
  }
  const listaNekretnina = data;
  const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
    },
    {
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
  }]
  //instanciranje modula
  let nekretnine = SpisakNekretnina();
  nekretnine.init(listaNekretnina, listaKorisnika);
  //pozivanje funkcije
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuća");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");   
});