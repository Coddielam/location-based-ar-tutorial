window.onload = () => {
  // let method = "dynamic";

  // if you want to statically add places, de-comment following line
  let method = "static";

  if (method === "static") {
    let places = staticLoadPlaces();
    renderPlaces(places);
  }

  if (method !== "static") {
    // first get current user location
    return navigator.geolocation.getCurrentPosition(
      function (position) {
        // than use it to load from remote APIs some places nearby
        dynamicLoadPlaces(position.coords).then((places) => {
          renderPlaces(places);
        });
      },
      (err) => console.error("Error in retrieving position", err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000,
      }
    );
  }
};

function staticLoadPlaces() {
  return [
    {
      name: "Eddie's Desk",
      location: {
        lat: 22.315877258444125, // add here latitude if using static data
        lng: 114.2116232775086, // add here longitude if using static data
      },
    },
    {
      name: "In front of the Tomato tree",
      location: {
        lat: 22.315340384447406,
        lng: 114.21148706163353,
      },
    },
    {
      name: "In front of the Coffee area",
      location: {
        lat: 22.31587494259916,
        lng: 114.21163332659212,
      },
    },
  ];
}

// getting places from REST APIs
function dynamicLoadPlaces(position) {
  let params = {
    radius: 300, // search places not farther than this value (in meters)
    clientId: "ZOGAJ3VNYDD404PRX2CHMH55MC5M41VOAQDYAZ2LHMYNAY24", // add your credentials here
    clientSecret: "QIPH0D5DXUUN5LSSOEUHMS0NMWRBNZBEB1XXQVCLSR2UBCBS", // add your credentials here
    version: "20300101", // foursquare versioning, required but unuseful for this demo
  };

  // CORS Proxy to avoid CORS problems
  let corsProxy = "https://cors-anywhere.herokuapp.com/";

  // Foursquare API
  let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
      &ll=${position.latitude},${position.longitude}
      &radius=${params.radius}
      &client_id=${params.clientId}
      &client_secret=${params.clientSecret}
      &limit=15
      &v=${params.version}`;
  return fetch(endpoint)
    .then((res) => {
      return res.json().then((resp) => {
        return resp.response.venues;
      });
    })
    .catch((err) => {
      console.error("Error with places API", err);
    });
}

function renderPlaces(places) {
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
    icon.setAttribute("src", "../assets/map-marker.png");

    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
    icon.setAttribute("scale", "20, 20");

    icon.addEventListener("loaded", () =>
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"))
    );

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
