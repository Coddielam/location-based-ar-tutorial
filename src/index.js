import { staticLoadPlaces } from "./utils/renderStaticPlaces.js";
import { Place } from "./utils/place.js";

window.onload = () => {
  let places = staticLoadPlaces();

  const placeInstances = places.map((place) => {
    return new Place(place.name, place.location.lat, place.location.lng);
  });

  placeInstances.forEach((place) => {
    const infoBox = document.createElement("div");
    infoBox.setAttribute("id", "directory-box");
    infoBox.setAttribute("name", place.name);
    document.querySelector("#root").append(infoBox);
  });

  setInterval(() => {
    placeInstances.forEach((place) => {
      document.querySelector(
        `#directory-box[name="${place.name}"]`
      ).innerHTML = `Distance from ${place.name}: ${place.distance}`;
    });
  }, 500);
};
