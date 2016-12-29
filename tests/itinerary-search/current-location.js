'use strict'

module.exports = {
    tags: ['geolocation'],
    'From my location nearby Blommenholm stasjon to Bryn stasjon': function(browser) {
        var browser = browser.url(browser.launch_url)
            .setGeolocation(59.896442, 10.554464);

        var destination = "Bryn, Oslo";

        browser.page.searchFields()
            .useCurrentLocationInOrigin()
            .openFrontPageSearchBar()
            .setDestination(destination)
            .chooseSuggestedDestination(destination);

        browser.page.itinerarySummary()
            .waitForFirstItineraryRow();

        browser.end();
    }
};
