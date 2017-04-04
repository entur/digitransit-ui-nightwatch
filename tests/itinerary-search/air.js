'use strict';

module.exports = {
  tags: ['air'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Travel from Oslo Lufthavn to Tromsoe lufthavn Langnes': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchWithModeAndVerify("Oslo Lufthavn", "Tromsø lufthavn", "air");
    browser.end();
  }
};
