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
                        url: data.photoURL ? data.photoURL : "./assets/user-placeholder.png",
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
                else
                {
                    document.getElementById('userData').innerHTML = `
                        <div class="col-12 mb-3">
                            <h3><b>Tu cuenta:</b></h3>
                        </div>
                        <div class="col-3">
                            <img class="img-fluid" style="max-height: 350px;" src="${data.photoURL}">
                        </div>
                        <div class="col-9 d-flex align-items-center mb-2">
                            <h4>${data.nombre}</h4>
                        </div>
                    `;
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