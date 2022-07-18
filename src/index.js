const staticLoadPlaces = require("./utils/renderStaticPlaces");
const renderPlaces = require("./utils/renderPlaces");

window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);

  const infoBox = document.querySelector("div.info-box");

  const appendInfoBoxMsg = function (info) {
    infoBox.innerHTML = JSON.stringify(info, null, 2);
  };

  appendInfoBoxMsg("Loading entity places ...");

  document.addEventListener("gps-entity-place-loaded", function () {
    appendInfoBoxMsg("Entity places LOADED!");
  });

  document.addEventListener("gps-entity-place-added", function () {
    appendInfoBoxMsg("Entity places ADDED!");
  });

  document.addEventListener("gps-camera-update-position", function (payload) {
    appendInfoBoxMsg(payload);
  });
};
