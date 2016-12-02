'use strict'

module.exports = {
    tags: ['air'],
    'Travel from Oslo Lufthavn to Trondheim Lufthavn Værnes': function(browser) {
        var browser = browser.url(browser.launch_url);

        browser.page.itinerarySearch()
              .executeItinerarySearchWithModeAndVerify("Oslo Lufthavn", "Trondheim lufthavn Værnes", "air");
        browser.end();
    }
};
