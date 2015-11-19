'use strict';

export function roundCount(x) {
  let len = x.toString().length
    , magnitude = Math.pow(10, len - 1);

  return Math.floor(x / magnitude) * magnitude;
}

export function formatCount(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
