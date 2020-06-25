var debitMap;
var debitMarker;
var creditMap;
var creditMarker;
var creditVipMap;
var creditVipMarker;

function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    debitMap = new google.maps.Map(
        document.getElementById('debitMap'),
        {
            center: coordenadas,
            zoom: 15
        }
    );

    creditMap = new google.maps.Map(
        document.getElementById('creditMap'),
        {
            center: coordenadas,
            zoom: 15
        }
    );

    creditVipMap = new google.maps.Map(
        document.getElementById('creditVipMap'),
        {
            center: coordenadas,
            zoom: 15
        }
    );

    debitMap.addListener('click', function(e) {
        if(debitMarker)
        {
            debitMarker.setPosition(e.latLng);
        }
        else
        {
            debitMarker = new google.maps.Marker({
                position: e.latLng,
                map: debitMap
            });
        }

        debitMap.panTo(e.latLng);
    });
    creditMap.addListener('click', function(e) {
        if(creditMarker)
        {
            creditMarker.setPosition(e.latLng);
        }
        else
        {
            creditMarker = new google.maps.Marker({
                position: e.latLng,
                map: creditMap
            });
        }

        creditMap.panTo(e.latLng);
    });
    creditVipMap.addListener('click', function(e) {
        if(creditVipMarker)
        {
            creditVipMarker.setPosition(e.latLng);
        }
        else
        {
            creditVipMarker = new google.maps.Marker({
                position: e.latLng,
                map: creditVipMap
            });
        }

        creditVipMap.panTo(e.latLng);
    });
}