function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    var map = new google.maps.Map(
        document.getElementById('map'),
        {
            center: coordenadas,
            zoom: 15
        }
    );

    var marker = new google.maps.Marker({position: coordenadas, map: map});
}