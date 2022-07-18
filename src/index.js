const staticLoadPlaces = require("./utils/renderStaticPlaces");
const renderPlaces = require("./utils/renderPlaces");

window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};
