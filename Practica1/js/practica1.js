function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    var map = new google.maps.Map(
        document.getElementById('mapa'),
        {
            center: coordenadas,
            zoom: 15
        }
    );  

    var marcador = new google.maps.Marker({position: coordenadas, map: map});
}