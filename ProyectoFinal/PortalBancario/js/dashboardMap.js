function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    var mapCharge = new google.maps.Map(
        document.getElementById('mapCharge'),
        {
            center: coordenadas,
            zoom: 15
        }
    );  

    var mapDeposit = new google.maps.Map(
        document.getElementById('mapDeposit'),
        {
            center: coordenadas,
            zoom: 15
        }
    );  

    var chargeMarker = new google.maps.Marker({position: coordenadas, map: mapCharge});
    var depositMarker = new google.maps.Marker({position: coordenadas, map: mapDeposit});
}