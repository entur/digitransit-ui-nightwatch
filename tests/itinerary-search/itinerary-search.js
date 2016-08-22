'use strict'

module.exports = {
    tags: ["itinerary", "skip"], // NRP-549 needs to find and click correct suggested item.
    'Origin and destination exists in instructions if suggestion is chosen': function(browser) {
        var browser = browser.url(browser.launch_url);

        var searchFields = browser.page.searchFields();
        searchFields.itinerarySearch("Hausmanns gate", "Malerhaugveien 28");

        var itinerarySummary = browser.page.itinerarySummary();
        itinerarySummary.waitForFirstItineraryRow();
        itinerarySummary.chooseFirstItinerarySuggestion();

        var itineraryInstructions = browser.page.itineraryInstructions();
        itineraryInstructions.waitForFirstItineraryInstructionColumn();
        itineraryInstructions.verifyOrigin("Hausmanns gate, Oslo");
        itineraryInstructions.verifyDestination("Malerhaugveien 28");
        browser.end();
    },
    'From Hausmanns gate to Ula nord': function(browser) {
        var browser = browser.url(browser.launch_url);
        var searchFields = browser.page.searchFields();
        searchFields.itinerarySearch("Hausmanns gate", "Ula nord");
        browser.page.itinerarySummary().waitForFirstItineraryRow();
        browser.end();
    },
    'From Røros skole to Festplassen, Bergen': function(browser) {
        var browser = browser.url(browser.launch_url);
        var searchFields = browser.page.searchFields();
        searchFields.itinerarySearch("Røros skole", "Festplassen");
        browser.page.itinerarySummary().waitForFirstItineraryRow();
        browser.end();
    },
    'From Festplassen, Bergen to Scandic Alta': function(browser) {
        var browser = browser.url(browser.launch_url);
        var searchFields = browser.page.searchFields();
        searchFields.itinerarySearch("Festplassen", "Scandic Alta");
        browser.page.itinerarySummary().waitForFirstItineraryRow();
        browser.end();
    }
}
