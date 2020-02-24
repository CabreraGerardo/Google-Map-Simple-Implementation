$(document).ready(function(){
    
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        $('#demo').text("No tiene geolocalización");
    }
}

function showPosition(position) {
    $('#demo').html("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);

    console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
}