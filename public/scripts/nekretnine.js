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
        <p class="lokacija" style="display: none;">Lokacija: ${nekretnina.lokacija}</p>
        <p class="godina-izgradnje" style="display: none;">Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
        <button onclick="info(this)">Detalji</button>
        <button onclick="otvoriDetalje(${nekretnina.id})" style="display: none;">Otvori detalje</button>
      `;
      divReferenca.appendChild(nekretninaDiv);
    });
  }
  return filtriraneNekretnine;
}

function info(button) {
  const nekretninaDiv = button.parentElement;
  const lokacijaParagraph = nekretninaDiv.querySelector('.lokacija');
  const godinaIzgradnjeParagraph = nekretninaDiv.querySelector('.godina-izgradnje');
  const detaljiButton = nekretninaDiv.querySelector('button');
  const otvoriDetaljeButton = nekretninaDiv.querySelector('button:nth-of-type(2)');

  lokacijaParagraph.style.display = (lokacijaParagraph.style.display === 'none') ? 'block' : 'none';
  godinaIzgradnjeParagraph.style.display = (godinaIzgradnjeParagraph.style.display === 'none') ? 'block' : 'none';

  detaljiButton.style.display = (detaljiButton.style.display === 'none') ? 'block' : 'none';
  otvoriDetaljeButton.style.display = (otvoriDetaljeButton.style.display === 'none') ? 'block' : 'none';
}

function otvoriDetalje(nekretnina_id) {
  PoziviAjax.getNekretninaById(nekretnina_id, (error, nekretnina) => {
    if (error) {
      console.error('Greška pri dohvatu detalja:', error);
      return;
    }
    window.location.href = `detalji.html?id=${nekretnina.id}&tip_nekretnine=${nekretnina.tip_nekretnine}&naziv=${nekretnina.naziv}&kvadratura=${nekretnina.kvadratura}&cijena=${nekretnina.cijena}&tip_grijanja=${nekretnina.tip_grijanja}&lokacija=${nekretnina.lokacija}&godina_izgradnje=${nekretnina.godina_izgradnje}&datum_objave=${nekretnina.datum_objave}&opis=${nekretnina.opis}`;
  });
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