'use strict';

module.exports = {
  tags: ['stops', 'map', 'geolocation'],
  'Click any bus stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);

    browser.setGeolocation(59.866343, 10.489440); // nedre berger?
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("bus")
    .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
        // TODO: Enable when route data is present for stops in map.
        // stopCard.waitForDepartureVisible();

    stopCard.waitForRoutesFromHere()
    .clickRoutesFromHere();

    marker.clickAnyStopMarker("bus")
      .waitForPopupPaneVisible();

    stopCard.waitForRoutesVisible()
    .waitForRoutesToHere()
    .clickRoutesToHere();

    // TODO refactor!
    browser.waitForElementVisible('.field-link.from-link').click('.field-link.from-link');
    browser.waitForElementVisible('.search-modal-container input')
      .clearValue('.search-modal-container input')
      .setValue('.search-modal-container input', "Helsfyr"); //"Grünerløkka" not working);

    browser.waitForElementVisible('.Stop:first-of-type .icon').click('.Stop:first-of-type .icon');

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any tram stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9118796,10.750129); // jernbanetorget
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("tram")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    marker.clickAnyStopMarker("tram")
      .waitForPopupPaneVisible();

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere();

    // TODO refactor!
    browser.waitForElementVisible('.field-link.from-link').click('.field-link.from-link');
    browser.waitForElementVisible('.search-modal-container input')
      .clearValue('.search-modal-container input')
      .setValue('.search-modal-container input', "Helsfyr"); //"Grünerløkka" not working);

    browser.waitForElementVisible('.Stop:first-of-type .icon').click('.Stop:first-of-type .icon');

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  }
};
