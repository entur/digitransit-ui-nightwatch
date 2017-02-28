'use strict';

module.exports = {
  tags: ['stops', 'search'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Search for Tanangerhallen and verify that the title is correct': function (browser) {
    const searchFields = browser.page.searchFields();
    searchFields.setSearch("Tanangerhallen");

    const stopCard = browser.page.stopCard();

    stopCard.expectCardHeader("Tanangerhallen");

    // stopCard.waitForDepartureVisible();
    browser.end();
  }
};
