var coordenadas = {
    lat: 21.1583603, 
    lng: -101.6499236
}

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const idioma =  urlParams.get('idioma');
console.log(idioma);

document.getElementById('idioma').value = idioma;

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyADjOfdGIg-7JiqjoTstMN9el4g-nLhxxA&callback=initMap&language=' + idioma;

document.head.appendChild(script);

function initMap() {
    var map = new google.maps.Map(
        document.getElementById('map'),
        {
            center: coordenadas,
            zoom: 7
        }
    );
};