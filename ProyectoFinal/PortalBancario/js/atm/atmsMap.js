var atmMap;

function initMap()
{
    var coordenadas = {
        lat: 21.152317,
        lng: -101.711359
    }

    atmMap = new google.maps.Map(
        document.getElementById('map'),
        {
            center: coordenadas,
            zoom: 15
        }
    );


    showAtms();
}