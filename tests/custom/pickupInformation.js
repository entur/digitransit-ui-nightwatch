'use strict';
/* NRP-840: Display information about ordering pickup where this is needed.
 Pickup order needed is indicated with a 'B' in the legs ruler when it is collapsed,
 and more information about this is displayed when the ruler is collapsed.
 */

let isSmall = false;
const isSmallWindow = require('../../util/util').isSmallWindow;

module.exports = {
  tags: ['pickup-information', 'custom'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Setup small window': function (browser) {
    isSmallWindow(browser, (small) => {
      isSmall = small;
    });
    browser.pause(1000);
    browser.end();
  },
  'Should show pickup information': function (browser) {
    const origin = 'Sørvær';
    const destination = 'Hasvik kai';
    const municipality = ', Hasvik';
    // Get upcoming Friday since this is the only day pickup is available for this route
    const thisFriday = new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay()) % 7)).toISOString().slice(0, 10);
    browser.page.itinerarySearch()
      .executeItinerarySearchWithDepartmentDateAndTime(origin + municipality, destination + municipality, thisFriday, '05:52am')
      .api.page.itinerarySummary()
      .waitForElementVisible('.pickup-dropoff')
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn(isSmall)
      .verifyOrigin(origin)
      .verifyDestination(destination)
      .verifyPickupText('This route require booking from operator (www.flexx.no/tel.:03177)');
    browser.end();
  },
};
