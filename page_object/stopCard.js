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
            selector: ".route-detail-text"
        },
        cardHeader: {
            /* TODO: Not exactly clear what this selector was meant to target,
               this modification could be wrong. The previous was not working either.
             */
            selector: ".to-link > span:last-of-type"
        }
    }
}
