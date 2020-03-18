var coordenadas = {
    lat: 0,
    lng: 0
}

var propiedades = {
    center: coordenadas,
    zoom: 20
}

function initMap(){
    
    map = new google.maps.Map(document.getElementById("map"), propiedades);

    var icono = {
        url: "https://d1s6fstvea5cci.cloudfront.net/content/themes/vtnz/resources/assets/images/pulse_dot.gif",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    }

    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0},
        icon: icono,
        scaledSize: new google.maps.Size(25, 25),
        map: map
    });

    if(navigator.geolocation)
    {
        setInterval(function(){
            moverPosicion(marker);
        }, 3000);
    }
}

function moverPosicion(marker){
    navigator.geolocation.getCurrentPosition(posicion => {
        var pos = {
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude
        }

        marker.setPosition(new google.maps.LatLng(pos.lat, pos.lng));
        map.panTo(new google.maps.LatLng(pos.lat, pos.lng));
        map.setCenter(pos);
    });
}
