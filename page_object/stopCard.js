'use strict'

var commands = {
    clickAnyMarker: function() {
        return this.click("@anyStopMarker");
    },
    waitForDepartureVisible: function() {
        return this.waitForElementVisible("@departure");
    },
    expectCardHeader: function(expected) {
        this.waitForElementVisible("@cardHeader");
        return this.assert.containsText("@cardHeader", expected);
    }
}

module.exports = {
    commands: [commands],
    elements: {
        departure: {
            selector: ".departure .route-detail-text"
        },
        cardHeader: {
            selector: ".card-header > span.h3"
        }
    }
}
