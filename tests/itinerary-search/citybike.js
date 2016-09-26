'use strict'

module.exports = {
    tags: ['citybike'],
    'CityBike in Trondheim': function(browser) {
        var browser = browser.url(browser.launch_url);

        browser.page.itinerarySearch()
                .executeItinerarySearchWithModeAndVerify("Nidareid",
                        "Gløshaugveien 4", "citybike")
                .api.end();

        browser.end();
    }
};
