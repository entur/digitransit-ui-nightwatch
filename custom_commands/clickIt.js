'use strict';

/**
 *
 * @param selector css selector
 * @param callback called when method is done executing with result of selenium result
 * @returns this (nightwatch)
 */
exports.command = function (selector, callback) {
  this.execute(function (selector) {
    window.document.querySelector(selector).click();
    return 0;
  }, [selector], function (result) {
    callback(result);
  });
  return this;
};
