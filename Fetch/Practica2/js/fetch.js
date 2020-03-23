var paises = document.getElementById("paises");

fetch('https://corona.lmao.ninja/countries')
.then((response) => {
    response.json().then((datos) => {
        datos.forEach((registro) => {
            document.getElementById("spinner").style.display='none';

            console.log(registro);

            let renglon = document.createElement("div");
            renglon.className = "row border bg-light rounded my-2";
            paises.appendChild(renglon);

            let columna = document.createElement("div");
            columna.className = "col-12 d-flex align-items-center";
            renglon.appendChild(columna);

            let nombre = document.createElement("p");
            nombre.className = "m-2";
            nombre.innerHTML = "<b>País:</b> " + registro.country + "<br><b>Casos:</b> " + registro.cases;
            columna.appendChild(nombre);
        });
    });
})
.catch((error) => {
    console.log('Hubo un problema con la petición Fetch: ' + error.message);
});