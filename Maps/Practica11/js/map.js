var center = {
    lat: 21.158376999999998,
    lng: -101.64770089999999
};

var zoom = 12;

current = 0;

var controlTypes = [
    {
        title: 'Estándar',
        description: 'Distribución de controles por defecto',
        properties: {
            center: center,
            zoom: zoom,
            restriction: {
                latLngBounds: {
                    north: 90,
                    south: -90,
                    west: -180,
                    east: 180
                },
                strictBounds: false
            },
        },
    },
];

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), 
        controlTypes[0].properties
    );

    document.getElementById('title').innerHTML = `${controlTypes[0].title}`;
    document.getElementById('description').innerHTML = `${controlTypes[0].description}`;
    

    controlTypes.push(
        {
            title: 'Sin Controles',
            description: 'Mapa sin controles de interfaz de usuario',
            properties: {
                center: center,
                zoom: zoom,
                disableDefaultUI: true
            }
        },
        {
            title: 'Sin Zoom',
            description: 'Sin controles en la interfaz para modificar el zoom del mapa',
            properties: {
                center: center,
                zoom: zoom,
                zoomControl: false,
                scaleControl: true,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true
            }
        },
        {
            title: 'Estilo de Control de Tipo de Mapa',
            description: 'Se cambia el estilo en el que los tipos de mapa se presentan',
            properties: {
                center: center,
                zoom: zoom,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'satellite', 'terrain']
                },
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                scaleControl: true,
            }
        },
        {
            title: 'Posiciones de Controles',
            description: 'Se cambia la posición de los controles',
            properties: {
                center: center,
                zoom: zoom,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                fullscreenControl: true,
                restriction: {
                    latLngBounds: {
                        north: 90,
                        south: -90,
                        west: -180,
                        east: 180
                    },
                    strictBounds: false
                },
            }
        },
        {
            title: 'Zona Restringida',
            description: 'Se restringe la zona visible del mapa',
            properties: {
                center: center,
                zoom: zoom,
                restriction: {
                    latLngBounds: {
                        north: 21.390039,
                        south: 20.858414,
                        west: -102.149631,
                        east: -101.092990
                    },
                    strictBounds: false
                },
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
            }
        }
    );
    
    setType();
}

function setType(){
    document.getElementById('title').innerHTML = `${controlTypes[current].title}`;
    document.getElementById('description').innerHTML = `${controlTypes[current].description}`;
    map.setOptions(controlTypes[current].properties);

    if(controlTypes[current].title == 'Posiciones de Controles'){
        document.getElementById("floating-header").style.left = "40%";
    }
    else{
        document.getElementById("floating-header").style.left = "50%";
    }
}

document.getElementById('btnPrev').addEventListener('click', ev => {
    current = current > 0 ? current -= 1 : controlTypes.length - 1;
    setType();
});

document.getElementById('btnNext').addEventListener('click', ev => {
    current = current < controlTypes.length - 1 ? current += 1 : 0;
    setType();
});