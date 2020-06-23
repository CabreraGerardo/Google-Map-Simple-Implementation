var mapCharge;
var chargeMarker;

var depositMarker;
var mapDeposit;

function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    mapCharge = new google.maps.Map(
        document.getElementById('mapCharge'),
        {
            center: coordenadas,
            zoom: 15
        }
    );  

    mapDeposit = new google.maps.Map(
        document.getElementById('mapDeposit'),
        {
            center: coordenadas,
            zoom: 15
        }
    );  

    chargeMarker = new google.maps.Marker({position: coordenadas, map: mapCharge});
    depositMarker = new google.maps.Marker({position: coordenadas, map: mapDeposit});
}