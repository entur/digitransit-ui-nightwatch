'use strict'

module.exports = {
  tags: ['stops', 'map', 'geolocation'],
  'Click any bus stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);

    browser.setGeolocation(59.866343, 10.489440);
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyBusStopMarker();
    marker.waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
        // TODO: Enable when route data is present for stops in map.
        // stopCard.waitForDepartureVisible();

    stopCard.waitForRoutesFromHere();
    stopCard.clickRoutesFromHere();

    marker.clickAnyBusStopMarker();
    marker.waitForPopupPaneVisible();

    stopCard.waitForRoutesVisible();
    stopCard.waitForRoutesToHere();

    stopCard.clickRoutesToHere();

    // TODO refactor!
    browser.waitForElementVisible('.field-link.from-link').click('.field-link.from-link');
    browser.waitForElementVisible('.search-modal-container input')
      .clearValue('.search-modal-container input')
      .setValue('.search-modal-container input', "Helsfyr"); //"Grünerløkka" not working);

    browser.waitForElementVisible('.Stop:first-of-type .icon').click('.Stop:first-of-type .icon');

    stopCard.waitForRoutesToThis();

    browser.end();
  }
  /*
   ,
   'Any bus stop: route to here': function (browser) {
    var browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.866343, 10.489440);
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyBusStopMarker();
    marker.waitForPopupPaneVisible();
    marker.clickRouteFromMarker();

    stopCard.waitForDepartureVisible();
    browser.end();
  },
  'Any bus stop: route from here': function (browser) {
    var browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.866343, 10.489440);
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyBusStopMarker();

    let stopCard = browser.page.stopCard();
    stopCard.waitForDepartureVisible();
    browser.end();
  }*/
};
