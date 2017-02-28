'use strict';

module.exports = {
  '@disabled': true, // TODO fix
  tags: ['air'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Travel from Oslo Lufthavn to Tromsø lufthavn Langnes': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchWithModeAndVerify("Oslo Lufthavn", "Tromsø lufthavn Langnes", "air");
    browser.end();
  }
};
