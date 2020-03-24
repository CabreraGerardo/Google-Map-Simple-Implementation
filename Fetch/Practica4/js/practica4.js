var coordenadas = {
    lat: 0,
    lng: 0
}

var propiedades ={
    center: coordenadas,
    zoom: 2
}

function obtenerMarcadores(){
    
    fetch('https://corona.lmao.ninja/countries')
    .then((response) => {
        response.json().then((datos) => {
            datos.forEach((marcador) => {
                console.log(marcador);

                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(marcador.countryInfo.lat, marcador.countryInfo.long),
                    title: marcador.country
                });

            });
        });
    })
    .catch((error) => {
        console.log('Hubo un problema con la petición Fetch: ' + error.message);
    });
};

function initMap(){
    const map = new google.maps.Map(document.getElementById("map"), propiedades);

    const markers = obtenerMarcadores();
};