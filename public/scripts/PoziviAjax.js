const PoziviAjax = (() => {

    // Dohvati trenutno prijavljenog korisnika
    function impl_getKorisnik(fnCallback) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:3000' + '/korisnik', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send();
    }

    // Ažuriraj podatke loginiranog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', 'http://localhost:3000' + '/korisnik', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send(JSON.stringify(noviPodaci));
    }

    // Dodaj novi upit za trenutno loginiranog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const xhr = new XMLHttpRequest();
        const data = { nekretnina_id, tekst_upita };

        xhr.open('POST', 'http://localhost:3000' + '/upit', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    // Dohvati sve nekretnine
    function impl_getNekretnine(fnCallback) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:3000' + '/nekretnine', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send();
    }

    // Prijavi korisnika
    function impl_postLogin(username, password, fnCallback) {
        const xhr = new XMLHttpRequest();
        const data = { username, password };

        xhr.open('POST', 'http://localhost:3000' + '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    // Odjavi korisnika
    function impl_postLogout(fnCallback) {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:3000' + '/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send();
    }

    function impl_postMarketingNekretnine(nizNekretnina, fnCallback) {
        const xhr = new XMLHttpRequest();
        const data = { nizNekretnina };

        xhr.open('POST', 'http://localhost:3000' + '/marketing/nekretnine', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, xhr.responseText);
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    function impl_postMarketingNekretninaId(fnCallback) {
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', 'http://localhost:3000' + '/marketing/nekretnina/:id', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, xhr.responseText);
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send();
    }

    function impl_postMarketingOsvjezi(nizNekretnina, fnCallback) {
        const xhr = new XMLHttpRequest();
        const data = { nizNekretnina };
        
        xhr.open('POST', 'http://localhost:3000' + '/marketing/osvjezi', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    }

    function impl_getNekretninaById(nekretnina_id, fnCallback) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:3000' + '/nekretnina/' + nekretnina_id, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    fnCallback(`Greška: ${xhr.status}`, null);
                }
            }
        };

        xhr.send();
    }
    
    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        postMarketingNekretnine: impl_postMarketingNekretnine,
        postMarketingNekretninaId: impl_postMarketingNekretninaId,
        postMarketingOsvjezi: impl_postMarketingOsvjezi,
        getNekretninaById: impl_getNekretninaById
    };
})();
