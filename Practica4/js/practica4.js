var x = document.getElementById("mensaje");

function obtieneUbicacion() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(muestraPosicion);
    } 
    else 
    { 
        $('#mensaje').text("El navegador no dispone la capacidad de geolocalización");
    }
}

function muestraPosicion(posicion) {
    var coordenadas = posicion.coords.latitude + "," + posicion.coords.longitude;
    console.log(coordenadas);

    var img = 
    "https://maps.googleapis.com/maps/api/staticmap?center=" + 
    coordenadas + 
    "&zoom=17&size=400x350&sensor=false&key=AIzaSyADjOfdGIg-7JiqjoTstMN9el4g-nLhxxA";

    $("#mapa").empty();
    $("#mapa").append("<img src='" + img + "'>");
}

function buscar(){
    var img = 
    "https://maps.googleapis.com/maps/api/staticmap?center=" + 
    $("#txtPlace").val() + 
    "&zoom=17&size=400x350&sensor=false&key=AIzaSyADjOfdGIg-7JiqjoTstMN9el4g-nLhxxA";

    $("#mapa").empty();
    $("#mapa").append("<img src='" + img + "'>");    
}

