/**
 * Generates real Chile SVG paths from Natural Earth data.
 * Selects mainland (largest polygon) + Chiloé island.
 * Fits to SVG viewBox 0 0 460 670.
 *
 * Usage: node scripts/generate-chile-path.mjs
 */

import { geoMercator, geoPath } from "d3-geo";

const NE_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";

console.error("Fetching Natural Earth 50m countries…");
const res = await fetch(NE_URL);
const geojson = await res.json();

const chile = geojson.features.find(
  (f) => f.properties.ISO_A2 === "CL" || f.properties.ADM0_A3 === "CHL"
);
if (!chile) throw new Error("Chile not found");

// Collect all polygons with metadata
const polys = [];
const geom = chile.geometry;

const rings = geom.type === "Polygon"
  ? [geom.coordinates]
  : geom.coordinates; // MultiPolygon

for (const coords of rings) {
  const flat = coords[0];
  const minLon = Math.min(...flat.map(c => c[0]));
  const maxLon = Math.max(...flat.map(c => c[0]));
  const minLat = Math.min(...flat.map(c => c[1]));
  const maxLat = Math.max(...flat.map(c => c[1]));
  const avgLon = flat.reduce((s, c) => s + c[0], 0) / flat.length;
  const avgLat = flat.reduce((s, c) => s + c[1], 0) / flat.length;
  const area = (maxLon - minLon) * (maxLat - minLat);

  polys.push({ coords, flat, minLon, maxLon, minLat, maxLat, avgLon, avgLat, area, npts: flat.length });
}

console.error(`Total polygons: ${polys.length}`);
polys.forEach((p, i) =>
  console.error(`  [${i}] npts=${p.npts} area=${p.area.toFixed(2)} lon=[${p.minLon.toFixed(1)},${p.maxLon.toFixed(1)}] lat=[${p.minLat.toFixed(1)},${p.maxLat.toFixed(1)}]`)
);

// Mainland = largest polygon
const mainland = polys.reduce((a, b) => (a.npts > b.npts ? a : b));

// Chiloé: between -43 and -42 lat, lon around -73 to -72, NOT the mainland
const chiloe = polys.find(
  (p) =>
    p !== mainland &&
    p.avgLat < -41 && p.avgLat > -44 &&
    p.avgLon > -75 && p.avgLon < -72 &&
    p.npts > 10
);

console.error(`\nMainland: npts=${mainland.npts}`);
if (chiloe) console.error(`Chiloé:   npts=${chiloe.npts} avgLat=${chiloe.avgLat.toFixed(2)}`);

// ── Projection ──────────────────────────────────────────────────────────────
const SVG_W = 460;
const SVG_H = 670;
const PAD_X = 20;
const PAD_TOP = 24;
const PAD_BOT = 24;

// Fit to Chile mainland bounding box with slight east padding (labels on right)
const projection = geoMercator().fitExtent(
  [[PAD_X, PAD_TOP], [SVG_W * 0.35, SVG_H - PAD_BOT]], // keep labels on right half
  {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [mainland.coords[0]],
    },
    properties: {},
  }
);

const pathGen = geoPath(projection);

function toFeature(coords) {
  return {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: coords },
    properties: {},
  };
}

// Output the paths
const mainlandPath = pathGen(toFeature(mainland.coords));
console.log("MAINLAND:");
console.log(mainlandPath);

if (chiloe) {
  const chiloePath = pathGen(toFeature(chiloe.coords));
  console.log("\nCHILOE:");
  console.log(chiloePath);
}

// Also print projected coordinates for the 5 zone nodes
const nodes = [
  { label: "Antofagasta (UA · Norte)",    lon: -70.4,  lat: -23.65 },
  { label: "Santiago (USACH)",             lon: -70.65, lat: -33.45 },
  { label: "Rancagua (UOH)",               lon: -70.73, lat: -34.17 },
  { label: "Temuco (UFRO · Centro)",       lon: -72.6,  lat: -38.73 },
  { label: "Punta Arenas (UMAG · Sur)",    lon: -70.9,  lat: -53.15 },
];

console.log("\nNODE COORDINATES:");
for (const n of nodes) {
  const [x, y] = projection([n.lon, n.lat]);
  console.log(`  ${n.label}: cx=${x.toFixed(1)}, cy=${y.toFixed(1)}`);
}
