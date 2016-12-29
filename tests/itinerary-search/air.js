'use strict';

module.exports = {
  '@disabled' : true, // TODO fix
    tags: ['air'],
    'Travel from Oslo Lufthavn to Tromsø lufthavn Langnes': function(browser) {
        var browser = browser.url(browser.launch_url);

        browser.page.itinerarySearch()
              .executeItinerarySearchWithModeAndVerify("Oslo Lufthavn", "Tromsø lufthavn Langnes", "air");
        browser.end();
    }
};
