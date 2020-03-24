var coordenadas = {
    lat: 0,
    lng: 0
}

var propiedades ={
    center: coordenadas,
    zoom: 2
}

function obtenerMarcadores(){
    const markers = [
        {
            name: "Mexico",
            longitude: "-99.1276",
            latitude: "19.427"
        },
        {
            name: "Brazil",
            longitude: "-47.9292",
            latitude: "-15.7801"
        },
        {
            name: "Spain",
            longitude: "-3.70327",
            latitude: "40.4167"
        }
    ];

    return markers;
};

function initMap(){
    const map = new google.maps.Map(document.getElementById("map"), propiedades);

    const markers = obtenerMarcadores();

    for(marcador in markers){
        let marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(marcador.latitude, marcador.longitude),
            title: marcador.name
        });
    }
};