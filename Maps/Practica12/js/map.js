var coords = {
    lat: 21.158376999999998,
    lng: -101.64770089999999
};

var zoom = 12;

var current = 0;

var events = [
    {
        title: 'Click al Marcador',
        description: 'Evento disparado al dar click en un marcador'
    },
    {
        title: 'Cambio de Centro',
        description: 'Evento disparado cuando se detecta un cambio en las coordenadas centrales del mapa'
    },
    {
        title: 'Cambio de Zoom',
        description: 'Evento disparado cuando se detecta un cambio en las zoom del mapa'
    },
    {
        title: 'Colocar Marcador',
        description: 'Al dar click en el mapa, se agrega un marcador y se navega hasta ese punto'
    },
    {
        title: 'Coordenadas',
        description: 'Al dar click en el mapa, se agrega una ventana y se muestran las coordenadas'
    },
    {
        title: 'Botón',
        description: 'Evento disparado por un elemento fuera del mapa'
    }
];

var markers = [];
var infowindow = null;

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), 
        {
            center: coords,
            zoom: zoom
        }
    );

    document.getElementById('title').innerHTML = `${events[0].title}`;
    document.getElementById('description').innerHTML = `${events[0].description}`;
    
    setType();
}

function setType(){
    document.getElementById('title').innerHTML = `${events[current].title}`;
    document.getElementById('description').innerHTML = `${events[current].description}`;

    resetMap();

    switch(current){
        case 0:
            var marker = new google.maps.Marker({
                position: coords,
                map: map
            });

            markers.push(marker);

            marker.addListener('click', () => {
                map.setZoom(8);
                map.panTo(marker.getPosition());
            });

            break;
        case 1:
            var marker = new google.maps.Marker({
                position: coords,
                map: map
            });

            markers.push(marker);

            map.addListener('center_changed', () => {
                window.setTimeout(() => {
                    map.panTo(marker.getPosition());
                }, 3000);
            });
            break;
        case 2:
            infowindow = new google.maps.InfoWindow({
                content: `Zoom: ${zoom}`,
                position: coords
            });

            map.addListener('zoom_changed', () => {
                infowindow.setContent(`Zoom: ${map.getZoom()}`);
            });

            infowindow.open(map);
            break;
        case 3:
            map.addListener('click', (e) => {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                });
    
                markers.push(marker);
                map.panTo(e.latLng);
            });
            break;
        case 4:
            infowindow = new google.maps.InfoWindow({
                content: `Haz click para obtener coordenadas`,
                position: coords
            });

            map.addListener('click', (e) => {
                infowindow.setPosition(e.latLng);
                infowindow.setContent(e.latLng.toString());
                infowindow.open(map);
            });

            infowindow.open(map);
            break;
        case 5:
            document.getElementById('divBtn').setAttribute('style', 'display: inline-block !important;');
            
            var btn = document.getElementById('btnDom');
            google.maps.event.addDomListener(btn, 'click', () => {
                map.panTo(coords);
            });
            break;    
    }
}

document.getElementById('btnPrev').addEventListener('click', ev => {
    current = current > 0 ? current -= 1 : events.length - 1;
    setType();
});

document.getElementById('btnNext').addEventListener('click', ev => {
    current = current < events.length - 1 ? current += 1 : 0;
    setType();
});

function resetMap() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    google.maps.event.clearListeners(map, 'center_changed');
    google.maps.event.clearListeners(map, 'zoom_changed');
    google.maps.event.clearListeners(map, 'click');

    if (infowindow) {
        infowindow.close();
        infowindow = null;
    }

    document.getElementById('divBtn').setAttribute('style', 'display: none !important');
}