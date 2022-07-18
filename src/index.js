const staticLoadPlaces = require("./utils/renderStaticPlaces");
const renderPlaces = require("./utils/renderPlaces");

window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);

  const camera = document.querySelector("[camera]");
  const market = document.querySelector("a-marker");

  const infoBox = document.querySelector(".info-box");

  marker.addEventListener("markerFound", () => {
    let cameraPosition = camera.object3D.position;
    let markerPosition = marker.object3D.position;
    let distance = cameraPosition.distanceTo(markerPosition);

    check = setInterval(() => {
      cameraPosition = camera.object3D.position;
      markerPosition = marker.object3D.position;
      distance = cameraPosition.distanceTo(markerPosition);

      // do what you want with the distance:
      infoBox.innerHTML = `Distance from marker: ${distance}`;
    }, 100);
  });

  marker.addEventListener("markerLost", () => {
    clearInterval(check);
  });
};
