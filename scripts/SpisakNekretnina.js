let SpisakNekretnina = function () {

    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];

    //implementacija metoda
    let init = function (listaNekretninaParametar, listaKorisnikaParametar) {

        listaNekretnina = listaNekretninaParametar;
        listaKorisnika = listaKorisnikaParametar;
    }

    let filtrirajNekretnine = function (kriterij) {
        
        if (!kriterij || Object.keys(kriterij).length === 0) {
            return listaNekretnina;
          }
      
        return listaNekretnina.filter(nekretnina => {
            
            let zadovoljavaKriterij = true;
      
            if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
              zadovoljavaKriterij = false;
            }
      
            if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
              zadovoljavaKriterij = false;
            }
      
            if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
              zadovoljavaKriterij = false;
            }
      
            if (kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena) {
              zadovoljavaKriterij = false;
            }
      
            if (kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena) {
              zadovoljavaKriterij = false;
            }
      
            return zadovoljavaKriterij;
        });
    }

    let ucitajDetaljeNekretnine = function (id) {
        return listaNekretnina.find(nekretnina => nekretnina.id === id) || null;
    }

    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};
    