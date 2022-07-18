export class Place {
  constructor(name, lat, lng, imgSrc) {
    const scene = document.querySelector("a-scene");
    if (!scene)
      throw new Error("A-scene must be present in the DOM to append locations");

    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.imgSrc = imgSrc || "./assets/mapMarker.png";

    const image = document.createElement("a-image");
    image.setAttribute(
      "gps-entity-place",
      `latitude: ${this.lat}; longitude: ${this.lng}`
    );
    image.setAttribute("src", this.imgSrc);
    image.setAttribute("scale", "0.5 0.5 0.5");

    this.el = image;

    this.el.addEventListener("loaded", () => {
      this.loaded();
    });

    this.el.addEventListener("update", () => {
      this.update();
    });

    scene.appendChild(this.el);
  }

  get distance() {
    const camera = document.querySelector("[camera]");
    if (!camera)
      throw new Error(
        "A-camera must be present in the DOM for getting distance to image"
      );

    const cameraPosition = camera.object3D.position;
    const imagePosition = this.el.object3D.position;
    const distance = cameraPosition.distanceTo(imagePosition);
    return distance;
  }

  loaded() {}

  update() {}
}
