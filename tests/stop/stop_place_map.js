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

    browser.end();
  },
  'Click any bus stop place marker in map and show routes to Helsfyr': function(browser) {
    browser = browser.url(browser.launch_url);

    browser.setGeolocation(59.866343, 10.489440); // nedre berger?
    //browser.page.searchFields().useCurrentLocationInOrigin();
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("bus")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterDestination("Helsfyr")
      .clickFirstDestination();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any tram stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9118796,10.750129); // jernbanetorget
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("tram")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any tram stop place marker in map and show routes to Helsfyr': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9118796,10.750129); // jernbanetorget
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.page.zoom().zoomIn(5);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("tram")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterDestination("Helsfyr")
      .clickFirstDestination();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any subway stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9149676,10.5015000); // kolsås
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("subway")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any subway stop place marker in map and show routes to Helsfyr': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9149676,10.5015000); // kolsås
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("subway")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterDestination("Helsfyr")
      .clickFirstDestination();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click ferry place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9037358,10.7458125); // Vippetangen
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("ferry")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .waitForRouteTitle("Vippetangen")
      .waitForRoutesCard("16:30", "København")
      .clickRoutesFromHere();

    browser.end();
  },
  'Click ferry place marker in map and show routes to Denmark': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9037358,10.7458125); // Vippetangen
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();

    let marker = browser.page.marker();
    marker.clickAnyStopMarker("ferry")
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterDestination("Frederikshavn Færgehavn") //Frederikshavn
      .clickFirstDestination();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  }
};
