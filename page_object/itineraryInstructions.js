'use strict'

var commands = {
    waitForFirstItineraryInstructionColumn: function() {
        return this.waitForElementVisible("@itineraryInstructionColumn", this.api.globals.itinerarySearchTimeout);
    },
    verifyOrigin: function(origin) {
        return this.waitForElementVisible("@itineraryOrigin", this.api.globals.itinerarySearchTimeout)
            .assert.containsText("@itineraryOrigin", origin);
    },
    verifyDestination: function(destination) {
        this.api.useXpath()
            .waitForElementVisible(`//div[@class='itinerary-leg-first-row' and contains(text(), '${destination}')]`)
            .useCss();
        return this;
    }
};

module.exports = {
    commands: [commands],
    elements: {
        itineraryInstructionColumn: ".itinerary-instruction-column",
        itineraryOrigin: ".itinerary-leg-first-row:nth-of-type(1)"
    }
};
