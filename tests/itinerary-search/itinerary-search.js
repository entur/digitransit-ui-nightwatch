'use strict'

module.exports = {
    tags: ["itinerary"],
    beforeEach: function(browser) {
      browser.url(browser.launch_url);
    },
    'From Hausmanns gate to Malerhaugveien 28': function(browser) {
        browser.page.searchFields()
              .itinerarySearch("Hausmanns gate", "Malerhaugveien 28")
            .api.page.itinerarySummary()
              .waitForFirstItineraryRow()
              .chooseFirstItinerarySuggestion()
            .api.page.itineraryInstructions()
              .waitForFirstItineraryInstructionColumn()
              .verifyOrigin("Hausmanns gate, Oslo")
              .verifyDestination("Malerhaugveien 28")
            .api.end();
    },
    'From Hausmanns gate to Ula nord': function(browser) {
        browser.page.searchFields()
              .itinerarySearch("Hausmanns gate", "Ula nord")
            .api.page.itinerarySummary()
              .waitForFirstItineraryRow()
              .chooseFirstItinerarySuggestion()
            .api.page.itineraryInstructions()
              .verifyOrigin("Hausmanns gate, Oslo")
              .verifyDestination("Ula nord, Larvik")
            .api.end();
    },
    'From Røros skole to Festplassen, Bergen': function(browser) {
        browser.page.searchFields()
            .itinerarySearch("Røros skole", "Festplassen")
          .api.page.itinerarySummary()
            .waitForFirstItineraryRow()
            .chooseFirstItinerarySuggestion()
          .api.page.itineraryInstructions()
            .verifyOrigin("Røros skole")
            .verifyDestination("Festplassen")
          .api.end();
    },
    'From Festplassen, Bergen to Scandic Alta': function(browser) {
        browser.page.searchFields()
            .itinerarySearch("Festplassen", "Scandic Alta")
          .api.page.itinerarySummary()
            .waitForFirstItineraryRow()
            .chooseFirstItinerarySuggestion()
          .api.page.itineraryInstructions()
            .verifyOrigin("Festplasse")
            .verifyDestination("Scandic Alta")
          .api.end();
    },
    searchAndVerify: function(browser) {
      
    }
}
