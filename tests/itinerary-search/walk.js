'use strict';

module.exports = {
  tags: ['walk'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Walk in the park': function (browser) {
    const searchFields = browser.page.searchFields();
    searchFields.itinerarySearch("Adamstuen", "Kværnerbyen");

    const customizeSearch = browser.page.customizeSearch();
    customizeSearch.clickCanvasToggle();
    customizeSearch.disableAllModalitiesExcept("");

    const itinerarySummary = browser.page.itinerarySummary();
    itinerarySummary.waitForItineraryRowOfType("walk");

    browser.end();
  }
};