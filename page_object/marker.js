'use strict';

const commands = {
    clickAnyBusStopMarker: function() {
        this.waitForElementVisible("@anyBusStopMarker");
        return this.click("@anyBusStopMarker");
    },
    clickAnyStopMarker: function(mode) {
        this.waitForElementVisible(`.leaflet-marker-icon.'${mode}'`);
        return this.click(".leaflet-marker-icon." + mode);
    },
    waitForPopupPaneVisible: function() {
        return this.waitForElementVisible("@popupPane");
    }
};

module.exports = {
    commands: [commands],
    elements: {
        anyBusStopMarker: {
            selector: ".leaflet-marker-icon.bus"
        },
        popupPane: {
            selector: ".leaflet-pane .leaflet-popup-pane"
        }
    }
};
