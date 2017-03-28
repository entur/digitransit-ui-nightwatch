'use strict';

/**
 *
 * @param selector css selector
 * @param callback called when method is done executing with result of selenium result
 * @returns this (nightwatch)
 */
exports.command = function (selector, callback) {
  this.execute(function (selector) {
    const nodes = window.document.querySelectorAll(selector);
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let min = { node: undefined, distance: Number.MAX_VALUE };

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const rect = node.getBoundingClientRect();

      if (rect.right > 0 && rect.bottom > 0 && rect.right < window.innerWidth && rect.bottom < window.innerHeight) {
        let distance = (rect.right - cx)^2 + (rect.bottom - cy)^2;

        if (distance < min.distance) {
          min = { node: node, distance: distance, idx: i }
        }
      }
    }

    if (min.node !== undefined) {
      console.log("clicking");
      console.log(min.node);
      min.node.click();
      return JSON.stringify(min.idx);
    }
    return 0;
  }, [selector], function (result) {
    callback(result);
  });
  return this;
};
