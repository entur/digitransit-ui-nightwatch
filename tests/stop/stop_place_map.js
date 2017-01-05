'use strict';

module.exports = {
  tags: ['stops', 'map', 'geolocation'],
  'Click any bus stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);

    browser.setGeolocation(59.477566,9.2980653); // Hem, Sauherad
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('bus')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
        // TODO: Enable when route data is present for stops in map.
        // stopCard.waitForDepartureVisible();

    stopCard.waitForRoutesFromHere()
    .clickRoutesFromHere();

    browser.end();
  },
  'Click any bus stop place marker in map and show routes to here': function(browser) {
    browser = browser.url(browser.launch_url);

    browser.setGeolocation(59.477566,9.2980653);  // Hem, Sauherad
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('bus')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput('Rjukan')
      .clickFirstStop();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any tram stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9118796,10.750129); // jernbanetorget
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('tram')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any tram stop place marker in map and show routes to here': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9118796,10.750129); // jernbanetorget
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('tram')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput('Helsfyr')
      .clickFirstStop();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any subway stop place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9149676,10.5015000); // kolsås
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('subway')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any subway stop place marker in map and show routes to here': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9149676,10.5015000); // kolsås
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('subway')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Mortensrud';
    let destination = 'Kolsås';

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.searchFields()
      .setDepartmentTime('07.00');

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn()
      //.waitForItineraryLegOfType('subway') - TODO add when data fixed
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
  'Click ferry place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9037358,10.7458125); // Vippetangen
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('ferry')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .waitForRouteTitle('Vippetangen')
      .waitForRoutesCard('Oslo')
      .clickRoutesFromHere();

    browser.end();
  },
  'Click ferry place marker in map and show routes to here': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9037358,10.7458125); // Vippetangen
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickAnyStopMarker('ferry')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Frederikshavn Færgehavn';
    let destination = 'Oslo Vippetangen';
    let thisFriday = new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay()) % 7)).toISOString().slice(0,10);

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.searchFields()
      .setDepartmentDate(thisFriday)
      .setDepartmentTime('07.30');

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn()
      .waitForItineraryLegOfType('ferry')
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
  'Click park-and-ride place marker in map and show its departures': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9486485,10.886911);
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let destination = 'P+R Grorud Stasjon';
    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('park-and-ride')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .waitForRouteTitle('Park and ride')
      .waitForRouteSubTitle(destination)
      .clickRoutesFromHere();

    browser.end();
  },
  'Click park-and-ride place marker in map and show routes to here': function(browser) {
    browser = browser.url(browser.launch_url);
    browser.setGeolocation(59.9486485,10.8875);
    browser.page.zoom().zoomIn(5);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('park-and-ride')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Larvik';
    let destination = 'P+R Grorud Stasjon';

    stopCard.waitForRoutesVisible()
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn()
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
};
