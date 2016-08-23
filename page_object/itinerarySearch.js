'use strict'

// Not really a page object, but it uses multiple page objects.
var commands = {
  executeItinerarySearchAndVerify: function(origin, destination) {
    return this.api.page.searchFields()
          .itinerarySearch(origin, destination)
        .api.page.itinerarySummary()
          .waitForFirstItineraryRow()
          .chooseFirstItinerarySuggestion()
        .api.page.itineraryInstructions()
          .waitForFirstItineraryInstructionColumn()
          .verifyOrigin(origin)
          .verifyDestination(destination);
  }
};

module.exports = {
    commands: [commands],
    elements: {}
};
