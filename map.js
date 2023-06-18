let part2 = document.getElementById("#result");
mapboxgl.accessToken = 'pk.eyJ1Ijoic29uaXJhaHVsIiwiYSI6ImNsaXpxcHVqYjBjZm8zbnA5djl3N3FhOXcifQ.Tc0o69LZT8JtES9uqRUMVw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-79.4512, 43.6568],
    zoom: 1.5
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
        color: 'orange'
    },
    mapboxgl: mapboxgl

});

map.addControl(geocoder);

map.on('click', onmapClick);

// after click
async function onmapClick(e) {

    marker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
    // url-> https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e.lngLat.lat}&longitude=${e.lngLat.lng}&localityLanguage=en
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e.lngLat.lat}&longitude=${e.lngLat.lng}&localityLanguage=en`);
    const jsonData = await response.json();
    const secondresp = await fetch(`https://restcountries.com/v3.1/name/${jsonData.countryName}`);
    const jsonData2 = await secondresp.json();
// console.log(jsonData)
    result.innerHTML = "<br><h6>Country Name :" + jsonData.countryName + "</h6><br><h6>Country Code :" + jsonData.countryCode + "</h6><br><h6>Capital Name :" + jsonData2[0].capital + "</h6><br><h6>Country Population :" + jsonData2[0].population + "</h6><br></h6><h6>Area :" + jsonData2[0].area + "</h6><br><h6>Borders :" + jsonData2[0].borders + "</h6><br><h6>Lng,Lat :" + e.lngLat.lng+ " , "+ e.lngLat.lat + "</h6><br> <img width='40px' src='" + jsonData2[0].coatOfArms.png + "'/>";

}
// inital set
const marker = new mapboxgl.Marker()
    .setLngLat([0, 0])
    .addTo(map);
