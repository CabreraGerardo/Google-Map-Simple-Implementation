var markers = [];

function loadUsers(){
    db.collection('usuariosUbicacion').onSnapshot( snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            console.log(change.doc.data());
            data = change.doc.data();

            var pos = new google.maps.LatLng(data.location.latitude, data.location.longitude);
            
            if(change.type == "added")
            {
                if(change.doc.id != localStorage.user)
                {

                    var icono = {
                        url:"./assets/user-placeholder.png",
                        scaledSize: new google.maps.Size(45, 45),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 0)
                    }

                    var marker = new google.maps.Marker({
                        position: pos,
                        icon: icono,
                        scaledSize: new google.maps.Size(25, 25),
                        map: map,
                        id: change.doc.id
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: data.nombre
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                    markers.push(marker);
                }
                
            }
            else if(change.type == "modified")
            {                
                console.log(markers);
                let markerIndex = markers.findIndex(marker => marker.id == change.doc.id);

                markers[markerIndex].setPosition(pos);
            }
        });
    });
}