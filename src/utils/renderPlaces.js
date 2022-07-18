export function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    const latitude = place.location.lat;
    const longitude = place.location.lng;

    // add place icon
    const icon = document.createElement("a-image");
    icon.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude}`
    );
    icon.setAttribute("name", place.name);
    icon.setAttribute("scale", "0.5 0.5 0.5");
    icon.setAttribute("src", "./map-marker.png");

    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
    icon.setAttribute("scale", "10, 10");

    icon.addEventListener("loaded", (e) => {
      icon.dispatchEvent(
        new CustomEvent("gps-entity-place-loaded", { bubbles: true, el: e })
      );
    });

    icon.addEventListener("update", () => {
      icon.dispatchEvent(
        new CustomEvent("gps-entity-place-update-position", {
          bubble: true,
          el: e,
        })
      );
    });

    const clickListener = function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      const name = ev.target.getAttribute("name");

      const el = ev.detail.intersection && ev.detail.intersection.object.el;

      if (el && el === ev.target) {
        const label = document.createElement("span");
        const container = document.createElement("div");
        container.setAttribute("id", "place-label");
        label.innerText = name;
        container.appendChild(label);
        document.body.appendChild(container);

        setTimeout(() => {
          container.parentElement.removeChild(container);
        }, 1500);
      }
    };

    icon.addEventListener("click", clickListener);

    scene.appendChild(icon);
  });
}
