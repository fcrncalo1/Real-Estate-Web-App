document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        // Spriječavanje podnošenja obrasca kako bi spriječili preusmjeravanje
        event.preventDefault();

        // Dobivanje korisničkih podataka iz forme (username, password)
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Pozivanje funkcije za prijavu iz Ajax modula
        PoziviAjax.postLogin(username, password, function (error, data) {
            if (error) {
                console.error('Greška pri prijavi:', error);
            } else {
                console.log('Uspješna prijava:', data);
                if (window.parent && window.parent.prikaziOpcijeMenija) {
                    window.parent.prikaziOpcijeMenija(true);
                    // Preusmjeravanje na stranicu nekretnine.html nakon uspješne prijave
                    window.location.href = 'nekretnine.html';
                }
                else {
                    localStorage.setItem('prijavljen', 'true');
                    window.location.href = 'meni.html';    
                }
            }
        });
    });
});