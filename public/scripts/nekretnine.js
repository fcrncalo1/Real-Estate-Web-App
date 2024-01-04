let minCijena = document.getElementById('minCijena').value;
let maxCijena = document.getElementById('maxCijena').value;
let minKvadratura = document.getElementById('minKvadratura').value;
let maxKvadratura = document.getElementById('maxKvadratura').value;
const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
    const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine, min_cijena: minCijena, max_cijena: maxCijena, min_kvadratura: minKvadratura, max_kvadratura: maxKvadratura });
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
        <div style="display: none; justify-content: space-between; margin-bottom: 10px;">
        <div id="pretrage-idNekretnine">Broj pretraga:</div>
        <div id="klikovi-idNekretnine">Broj klikova:</div>
        </div>
        <button>Detalji</button>
      `;
      divReferenca.appendChild(nekretninaDiv);
    });
  }
  return filtriraneNekretnine;
}

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

function pretraziNekretnine() {
  minCijena = document.getElementById('minCijena').value;
  maxCijena = document.getElementById('maxCijena').value;
  minKvadratura = document.getElementById('minKvadratura').value;
  maxKvadratura = document.getElementById('maxKvadratura').value;
  console.log(minCijena,maxCijena,minKvadratura,maxKvadratura);
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
    let nekretnineStan = spojiNekretnine(divStan, nekretnine, "Stan");
    let nekretnineKuca = spojiNekretnine(divKuca, nekretnine, "Kuća");
    let nekretninePP = spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
    const spojeneNekretnine = [].concat(...[nekretnineStan, nekretnineKuca, nekretninePP].filter(niz => niz.length > 0));
    PoziviAjax.postMarketingNekretnine(spojeneNekretnine, (error, data) => {
      if (error) console.log("Greška: ", error);
      else console.log("Uspješan zahtjev!");
    })
  });
}