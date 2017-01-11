'use strict';

var isMobile = false;

function doZoom(browser, level) {
  const getSize = function getSize(result) {
    if (result.value.width >= 900) {
      isMobile = false;
      console.log("   - testing large device");
      browser.page.zoom().zoomIn(level);
    } else {
      isMobile = true;
      console.log("   - testing small device - ignoring zoom");
    }
  };

  browser.waitForElementVisible("#app");
  browser.getElementSize("#app", getSize);
  browser.pause(1000);
}

module.exports = {
  tags: ['stops', 'map', 'geolocation'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
    doZoom(browser, 5);
  },
  'Click any marker - isMobile setup': function (browser) {
    browser.setGeolocation(59.477566, 9.2980653); // Hem, Sauherad
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);
    browser.end();
  },
  'Click any bus stop place marker in map and show its departures': function (browser) {
    browser.setGeolocation(59.477566, 9.2980653); // Hem, Sauherad
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('bus')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    // TODO: Enable when route data is present for stops in map.
    // stopCard.waitForDepartureVisible();

    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any bus stop place marker in map and show routes to here': function (browser) {
    browser.setGeolocation(59.477566, 9.2980653);  // Hem, Sauherad
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('bus')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();

    stopCard.waitForRoutesVisible(isMobile)
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput('Rjukan')
      .clickFirstStop();

    browser.page.itinerarySummary().waitForFirstItineraryRow();
    browser.end();
  },
  'Click any tram stop place marker in map and show its departures': function (browser) {
    browser.setGeolocation(59.88849, 10.77163); //  Jomfrubråten
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('tram')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any tram stop place marker in map and show routes to here': function (browser) {
    browser.setGeolocation(59.88849, 10.77163); // Jomfrubråten
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('tram')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Rikshospitalet';
    let destination = 'Jomfrubråten';

    stopCard.waitForRoutesVisible(isMobile)
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn(isMobile)
      .waitForItineraryLegOfType('tram')
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
  'Click any subway stop place marker in map and show its departures': function (browser) {
    browser.setGeolocation(59.9149600, 10.5020000); // kolsås
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('subway')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .clickRoutesFromHere();

    browser.end();
  },
  'Click any subway stop place marker in map and show routes to here': function (browser) {
    browser.setGeolocation(59.9149600, 10.5020000); // kolsås
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('subway')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Mortensrud';
    let destination = 'Kolsås';

    stopCard.waitForRoutesVisible(isMobile)
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.searchFields()
      .setDepartmentTime('07.00am');

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn(isMobile)
      .waitForItineraryLegOfType('subway')
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
  'Click ferry place marker in map and show its departures': function (browser) {
    browser.setGeolocation(59.9037358, 10.7458125); // Vippetangen
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('ferry')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    stopCard.waitForRoutesFromHere()
      .waitForRouteTitle('Vippetangen')
      .waitForRoutesCard('Oslo')
      .clickRoutesFromHere();

    browser.end();
  },
  'Click ferry place marker in map and show routes to here': function (browser) {
    browser.setGeolocation(59.9037358, 10.7458125); // Vippetangen
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('ferry')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Frederikshavn Færgehavn';
    let destination = 'Oslo Vippetangen';
    let thisFriday = new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay()) % 7)).toISOString().slice(0, 10);

    stopCard.waitForRoutesVisible(isMobile)
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
      .waitForFirstItineraryInstructionColumn(isMobile)
      .waitForItineraryLegOfType('ferry')
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
  'Click park-and-ride place marker in map and show its departures': function (browser) {
    browser.setGeolocation(59.9486485, 10.886911);
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
  'Click park-and-ride place marker in map and show routes to here': function (browser) {
    browser.setGeolocation(59.9486485, 10.8875);
    browser.page.searchFields().useCurrentLocationInOrigin();
    browser.pause(1000);

    let marker = browser.page.marker();
    marker.clickFirstVisibleMarker('park-and-ride')
      .waitForPopupPaneVisible();

    let stopCard = browser.page.stopCard();
    let origin = 'Larvik';
    let destination = 'P+R Grorud Stasjon';

    stopCard.waitForRoutesVisible(isMobile)
      .waitForRoutesToHere()
      .clickRoutesToHere()
      .clickFromLink()
      .enterSearchInput(origin)
      .clickFirstStop();

    browser.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn(isMobile)
      .verifyOrigin(origin)
      .verifyDestination(destination);

    browser.end();
  },
};
