var coordenadas = {
    lat: 0,
    lng: 0
}

var propiedades ={
    center: coordenadas,
    zoom: 2
}

function obtenerMarcadores(map){
    
    var icono = {
        url: "https://cdn.pixabay.com/photo/2020/02/26/08/41/corona-4881111_1280.png",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    }

    var fetchConf = { method: 'GET',
               mode: 'no-cors',
               cache: 'default' };

    fetch('https://corona.lmao.ninja/countries')
    .then((response) => {
        response.json().then((datos) => {
            datos.forEach((marcador) => {
                console.log(marcador);
                
                var infoContent = "<h4>" + marcador.country + "</h4>"
                                  +"<h5>Casos: </h5>" + marcador.cases + "<br>"
                                  +"<h5>Nuevos hoy:</h5> " + marcador.todayCases + "<br>"
                                  +"<h5>Muertes:</h5> " + marcador.deaths + "<br>"
                                  +"<h5>Muertes Hoy:</h5> " + marcador.todayDeaths + "<br>"
                                  +"<h5>Recuperados:</h5> " + marcador.recovered + "<br>"
                                  +"<h5>Activos:</h5> " + marcador.active + "<br>"
                                  +"<h5>Críticos:</h5> " + marcador.critical + "<br>"
                                  +"<h5>Casos por millón:</h5> " + marcador.casesPerOneMillion;

                var info = new google.maps.InfoWindow({
                    content: infoContent
                });

                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(marcador.countryInfo.lat, marcador.countryInfo.long),
                    title: marcador.country + ': ' + marcador.cases,
                    icon: icono
                });

                marker.addListener('click', () => {
                    info.open(map, marker);
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

    const markers = obtenerMarcadores(map);
};