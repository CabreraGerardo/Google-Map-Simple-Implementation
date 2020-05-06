function initMap(){
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 21.152639, lng: -101.711598},
        zoom: 14
    });

    var informacion = new google.maps.InfoWindow;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var infoBody = '<div class="row p-0"><div class="col-12 text-center"><h5>Contenido del InfoWindow</h5></div></div>' +
            '<div class="row p-0 pt-2">' +
            '<div class="col-12 col-lg-2 py-2 text-center"><img width=50px src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Info_Sign.svg/512px-Info_Sign.svg.png"></div>'+
            '<div class="col-12 col-lg-10 py-2 text-center"><p>Este es el contenido de un InfoWindow, puede agregar html en esta ventana</p></div>'+
            '</div>'

            informacion.setPosition(pos);
            informacion.setContent(infoBody);
            informacion.open(map);

            map.setCenter(pos);
        });
    }
}