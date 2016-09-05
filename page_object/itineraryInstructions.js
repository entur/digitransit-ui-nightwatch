'use strict'

var commands = {
    waitForFirstItineraryInstructionColumn: function() {
        return this.waitForElementVisible("@itineraryInstructionColumn");
    },
    verifyOrigin: function(origin) {
        return this.waitForElementVisible("@itineraryOrigin")
            .assert.containsText("@itineraryOrigin", origin);
    },
    verifyDestination: function(destination) {
        this.api.useXpath()
            .waitForElementVisible(`//div[@class='itinerary-leg-first-row' and contains(text(), '${destination}')]`)
            .useCss();
        return this;
    },
    waitForItineraryLegOfType: function(mode) {
      let selector = ".itinerary-instruction-column." + mode;
      return this.waitForElementVisible(selector);
    }
};

module.exports = {
    commands: [commands],
    elements: {
        itineraryInstructionColumn: ".itinerary-instruction-column",
        itineraryOrigin: ".itinerary-leg-first-row:nth-of-type(1)"
    }
};
