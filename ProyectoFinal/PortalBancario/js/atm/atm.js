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
                        var icono = {
                            url: 'https://pngimage.net/wp-content/uploads/2018/05/atm-png-icon-6.png',
                            scaledSize: new google.maps.Size(50,50),
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(0,0)
                        }
                        let marker = new google.maps.Marker({
                            icon: icono,
                            map: atmMap,
                            title: place.name,
                            position: place.geometry.location
                        });

                        var info;
                        google.maps.event.addListener(marker, 'mouseover', function() {
                            info = new google.maps.InfoWindow({
                                content: this.title + '<br>' + place.vicinity,
                                position: this.position
                            });

                            info.open(atmMap);
                        });
                        google.maps.event.addListener(marker, 'mouseout', function() {
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