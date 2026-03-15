/* eslint-disable */

export const displayMap = (locations) => {
  if (!locations?.length) return;

  // Set in .env as MAPBOX_PUBLIC_TOKEN (run "npm run build" after adding it)
  mapboxgl.accessToken = process.env.MAPBOX_PUBLIC_TOKEN || '';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vtitov90/clvawxa4g00s601ph86vp77n2',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
