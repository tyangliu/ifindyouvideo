'use strict';

// Compute the haversine distance in km between two locations,
// ported from our Scala helper
export function haversineDistance(a, b) {
  let dLat  = Math.PI * 1/180 * (b.latitude - a.latitude)
    , dLong = Math.PI * 1/180 * (b.longitude - a.longitude);

  let x = Math.pow(Math.sin(dLat / 2), 2) +
          Math.cos(Math.PI * 1/180 * a.latitude) *
          Math.cos(Math.PI * 1/180 * b.latitude) *
          Math.pow(Math.sin(dLong / 2), 2);

  let greatCircleDistance = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return 3958.761 * 1.60934 * greatCircleDistance;
}
