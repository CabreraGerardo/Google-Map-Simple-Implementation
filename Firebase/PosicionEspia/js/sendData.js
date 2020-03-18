function updatePosition(lat, lng){
    db.collection("posicionEspia").doc("h4SV4yFgPiIv8DtQOmdR").update({
        lat: lat,
        lng: lng
    });
}