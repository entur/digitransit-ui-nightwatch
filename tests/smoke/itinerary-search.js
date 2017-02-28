'use strict';

module.exports = {
  '@tags': ['smoke'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'From Hausmanns gate to Malerhaugveien 28': function (browser) {
    const searchFields = browser.page.searchFields();
    searchFields.itinerarySearch("Hausmanns gate", "Malerhaugveien 28, Oslo");
    browser.page.itinerarySummary().waitForFirstItineraryRowPresent();
    browser.end();
  }
};
