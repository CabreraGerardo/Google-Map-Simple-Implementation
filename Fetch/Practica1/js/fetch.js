var paises = document.getElementById("paises");

fetch('datos.json')
.then((response) => {
    response.json().then((datos) => {
        datos.forEach((registro) => {
            console.log(registro);
            let nombre = document.createElement("p");
            nombre.textContent = "País: " + registro.country + ", casos: " + registro.cases;
            paises.appendChild(nombre);
        });
    });
})
.catch((error) => {
    console.log('Hubo un problema con la petición Fetch: ' + error.message);
});