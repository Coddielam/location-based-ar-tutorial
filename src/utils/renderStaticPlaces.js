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

module.exports = staticLoadPlaces;
