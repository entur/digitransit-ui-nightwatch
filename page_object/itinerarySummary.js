'use strict'

var commands = {
    waitForFirstItineraryRow: function() {
        return this.waitForElementPresent("@firstItinerarySummaryRow", this.api.globals.itinerarySearchTimeout);
    },
    waitForItineraryRowOfType: function(modality) {
        return this.waitForElementVisible(".line ." + modality + ":nth-of-type(1)", this.api.globals.itinerarySearchTimeout);
    },
    chooseFirstItinerarySuggestion: function() {
        return this.click("@firstItinerarySummaryRow");
    }
};

module.exports = {
    commands: [commands],
    elements: {
        firstItinerarySummaryRow: ".Feature:nth-of-type(1)"
    }
};
