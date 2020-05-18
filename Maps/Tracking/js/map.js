$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

function initMap(){    
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 15
    });

    var icono = {
        url: "https://d1s6fstvea5cci.cloudfront.net/content/themes/vtnz/resources/assets/images/pulse_dot.gif",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    }

    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0},
        icon: icono,
        scaledSize: new google.maps.Size(25, 25),
        map: map
    });

    var watchId = null;

    document.getElementById('btnStart').addEventListener('click', ev => {

        if(navigator.geolocation)
        {
            var positionOptions = {
                enableHighAccuracy: true,
                timeout: 10 * 1000,
                maximumAge: 30 * 1000
            }

            watchId = navigator.geolocation.watchPosition(
                posicion => {
                    var pos = {
                        lat: posicion.coords.latitude,
                        lng: posicion.coords.longitude
                    }
            
                    marker.setPosition(new google.maps.LatLng(pos.lat, pos.lng));
                    map.panTo(new google.maps.LatLng(pos.lat, pos.lng));
                    map.setCenter(pos);

                    var exactitud = posicion.coords.accuracy ? posicion.coords.accuracy : 'No disponible';
                    var altitud = posicion.coords.altitude ? posicion.coords.altitude : 'No disponible';
                    var velocidad = posicion.coords.speed ? posicion.coords.speed : 'No disponible';
                    var fecha = new Date(posicion.timestamp).toString();
            
                    document.getElementById('coords').innerHTML = `${pos.lat}, ${pos.lng}`;
                    document.getElementById('vel').innerHTML = `${velocidad}`;
                    document.getElementById('date').innerHTML = `${fecha}`;
                    document.getElementById('ex').innerHTML = `${exactitud}`;
                    document.getElementById('alt').innerHTML = `${altitud}`;

                    $('#tooltipInfo').attr('data-original-title','something else');
                }, 
                err => {
                    console.warn('ERROR(' + err.code + '): ' + err.message);
                },
                positionOptions
            );
        }
        else
        {
            alert('No se puede acceder a la ubicación de tu dispositivo');
        }
        
    });

    document.getElementById('btnStop').addEventListener('click', ev => {
        if(watchId !== null){
            navigator.geolocation.clearWatch(watchId);

            document.getElementById('coords').innerHTML = `Se detuvo el monitoreo`;
            document.getElementById('vel').innerHTML = `Se detuvo el monitoreo`;
            document.getElementById('date').innerHTML = ``;
            document.getElementById('ex').innerHTML = `Se detuvo el monitoreo`;
            document.getElementById('alt').innerHTML = `Se detuvo el monitoreo`;
        }
    });


}
