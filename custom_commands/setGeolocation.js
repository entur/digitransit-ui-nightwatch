'use strict';

/**
 * Sets geo-location in browser.
 * INFO: Requires using digitransit-ui with the following in the URL: ?mock
 *
 * @param latitude
 * @param longitude
 * @param callback ignore
 * @returns browser
 */
exports.command = function (latitude, longitude, callback) {
  this.execute(function (latitude2, longitude2) {
    window.mock.geolocation.setCurrentPosition(latitude2, longitude2);
  }, [latitude, longitude]);
  return this;
};
