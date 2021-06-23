// export class Map {
//   constructor(cords) {
//     this.coordinates = cords;
//     this.render(cords);
//   }
//   render(coordinates) {
//     if (!google) {
//       alert("google Map Not working");
//       return;
//     }

//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: coordinates,
//       zoom: 16,
//     });

//     new google.maps.Marker({
//       position: coordinates,
//       map: map,
//     });
//   }
// }

export class Map {
  constructor(cords) {
    this.coordinates = cords;
    console.log(cords);
    this.render();
  }
  render() {
    document.getElementById("map").innerHTML = ""; // clear the <p> in the <div id="map">
    const map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([
          this.coordinates.lng,
          this.coordinates.lat,
        ]),
        zoom: 10,
      }),
    });
  }
  getaddress() {
    const respone = fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${this.coordinates.lat}+${this.coordinates.lng}&key=25a4134491b54c1a88cf456580dbd402`
    )
      .then((respone) => respone.json())
      .then((data) => console.log(data.results[0].formatted));
  }
  getcoord() {
    const respone = fetch(
      "https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=25a4134491b54c1a88cf456580dbd402"
    )
      .then((respone) => respone.json())
      .then((data) => console.log(data.results[0].formatted));
  }
}
