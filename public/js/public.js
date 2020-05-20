$('#btnDropdownPracticas').click(function() {
    if($("#collapseBtn").is(":visible"))
    {
        document.getElementById('dropdownPracticas').style.left = 'auto';
        document.getElementById('dropdownPracticas').style.right = 'auto';
    }
    else
    {
        document.getElementById('dropdownPracticas').style.left = 'auto';
        document.getElementById('dropdownPracticas').style.right = '0px';
    }
});

document.getElementById('dropdownMaps').innerHTML += `
    <a class="dropdown-item" href="../../Maps/Practica1/Marcador.html">Práctica 1</a>
    <a class="dropdown-item" href="../../Maps/Practica2/navigator.html">Práctica 2</a>
    <a class="dropdown-item" href="../../Maps/Practica3/geolocation.html">Práctica 3</a>
    <a class="dropdown-item" href="../../Maps/Practica4/static_map.html">Práctica 4</a>
    <a class="dropdown-item" href="../../Maps/Practica5/infowindow.html">Práctica 5</a>
    <a class="dropdown-item" href="../../Maps/Practica6/current_location.html">Práctica 6</a>
    <a class="dropdown-item" href="../../Maps/Practica7/practica7.html">Práctica 7</a>
    <a class="dropdown-item" href="../../Maps/Practica8/practica8.html">Práctica 8</a>
    <a class="dropdown-item" href="../../Maps/Practica9/mapStyle.html">Práctica 9</a>
    <a class="dropdown-item" href="../../Maps/Tracking/index.html">Monitoreo de Vehículo</a>
    <a class="dropdown-item" href="../../Maps/Practica11/index.html">Controles de Mapas</a>
`;

document.getElementById('dropdownFirebase').innerHTML += `
    <a class="dropdown-item" href="../../Firebase/Practica1/alta_baja.html">Práctica 1</a>
    <a class="dropdown-item" href="../../Firebase/Practica2/editar.html">Práctica 2</a>
    <a class="dropdown-item" href="../../Firebase/PosicionEspia/current_location.html">Espía (Envío de Coordenada)</a>
    <a class="dropdown-item" href="../../Firebase/PosicionEspia/current_location_spy.html">Espía (Consulta de Coordenada)</a>
    <a class="dropdown-item" href="../../Firebase/FireAuth/index.html">Auth</a>
    <a class="dropdown-item" href="../../Firebase/ShareLocation/index.html">Comparte Ubicación</a>
`;

document.getElementById('dropdownFetch').innerHTML += `    
    <a class="dropdown-item" href="../../Fetch/Practica1/practica1.html">Práctica 1</a>
    <a class="dropdown-item" href="../../Fetch/Practica2/practica2.html">Práctica 2</a>
    <a class="dropdown-item" href="../../Fetch/Practica3/practica3.html">Práctica 3</a>
    <a class="dropdown-item" href="../../Fetch/Practica4/practica4.html">Práctica 4</a>
`;