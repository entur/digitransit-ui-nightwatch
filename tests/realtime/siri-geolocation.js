'use strict';

module.exports = {
    '@tags': ['realtime'],
    beforeEach : function(browser) {
        browser.url(browser.launch_url)
    },
    'Stavanger has realtime data (Kolumbus)': function(browser) {
        var browser = browser.setGeolocation(58.96669, 5.731421);

        //Hack to reposition map to mocked geolocation
        browser.page.searchFields().useCurrentLocationInOrigin();

        browser.page.nearby()
            .openNearbyRoutes()
            .waitForRoutesWithRealtime();

        browser.end();
    },
    'Trondheim has realtime data (AtB)': function(browser) {
        var browser = browser.setGeolocation(63.4305, 10.3951);

        //Hack to reposition map to mocked geolocation
        browser.page.searchFields().useCurrentLocationInOrigin();

        browser.page.nearby()
            .openNearbyRoutes()
            .waitForRoutesWithRealtime();

        browser.end();
    },
    'Kristiansand has realtime data (AkT)': function(browser) {
        var browser = browser.setGeolocation(58.1599, 8.0182);

        //Hack to reposition map to mocked geolocation
        browser.page.searchFields().useCurrentLocationInOrigin();

        browser.page.nearby()
            .openNearbyRoutes()
            .waitForRoutesWithRealtime();

        browser.end();
    },
    'Oslo has realtime data (Ruter)': function(browser) {
        var browser = browser.setGeolocation(59.9139, 10.7522);

        //Hack to reposition map to mocked geolocation
        browser.page.searchFields().useCurrentLocationInOrigin();

        browser.page.nearby()
            .openNearbyRoutes()
            .waitForRoutesWithRealtime();

        browser.end();
    }
};
