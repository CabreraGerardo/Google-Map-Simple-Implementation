function showAtms(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            
            var icono = {
                url: "https://d1s6fstvea5cci.cloudfront.net/content/themes/vtnz/resources/assets/images/pulse_dot.gif",
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
            let currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var currentPosMarker = new google.maps.Marker({
                position: currentPos, 
                map: atmMap,        
                icon: icono,
                scaledSize: new google.maps.Size(25, 25),
            });
            atmMap.setCenter(currentPos);

            var service = new google.maps.places.PlacesService(atmMap);
                service.nearbySearch({
                    location: currentPos,
                    radius: 1000,
                    type: ['atm']
                },
                (results, status, pagination) => {
                    if(status !== "OK") return;

                    console.log(results);

                    let bounds = new google.maps.LatLngBounds();

                    results.forEach(place => {
                        let marker = new google.maps.Marker({
                            map: atmMap,
                            title: place.name,
                            position: place.geometry.location
                        });

                        var info = google.maps.InfoWindow({
                            content: this.title + '<br>' + place.vicinity,
                            position: this.position
                        });

                        google.maps.event.addListener(marker, 'mouseover', evt => {
                            info.open(atmMap);
                        });
                        google.maps.event.addListener(marker, 'mouseout', evt => {
                            info.close(atmMap);
                        });

                        bounds.extend(place.geometry.location);
                    });

                    atmMap.fitBounds(bounds);
                }
            );
        });
    }
}