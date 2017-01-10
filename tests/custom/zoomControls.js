/* NRP-837: Zoom control should be visible in map
 We have a created a PR (https://github.com/HSLdevcom/digitransit-ui/pull/1059) on this.
 */

module.exports = {
  tags: ['zoom-controls', 'custom'],
  'Zoom control buttons should be visible': function (browser) {
    var browser = browser.url(browser.launch_url);

    browser.waitForElementVisible("#app");
    browser.getElementSize("#app", function(result) {
      console.log(" - Testing with browser width: " + result.value.width);

      if (typeof result === 'undefined' || result.value.width >= 900) {
        console.log("   - testing large device");
        browser.waitForElementVisible('.leaflet-control-zoom-in', 1000);
        browser.waitForElementVisible('.leaflet-control-zoom-out', 1000);
      } else {
        console.log("   - testing small device");
        browser.assert.elementNotPresent('.leaflet-control-zoom-in');
        browser.assert.elementNotPresent('.leaflet-control-zoom-out');
      }
      browser.end();
    })
  },
};

