import { renderPlaces } from "./utils/renderPlaces.js";
import { staticLoadPlaces } from "./utils/renderStaticPlaces.js";

window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);

  const camera = document.querySelector("[camera]");

  window.addEventListener("gps-entity-place-loaded", (el) => {
    const infoBox = document.createElement("div");
    infoBox.setAttribute("id", "directory-box");
    document.querySelector("#root").append(infoBox);

    setInterval(() => {
      const cameraPosition = camera.object3D.position;
      const imagePosition = el.target.object3D.position;
      const distance = cameraPosition.distanceTo(imagePosition);
      infoBox.innerHTML = `distance: ${distance} / meters`;
    }, 500);
  });
};
