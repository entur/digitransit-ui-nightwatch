'use strict';

var commands = {
    clickAnyBusStopMarker: function() {
      return this.waitForElementVisible("@anyBusStopMarker").click("@anyBusStopMarker");
    },
    clickAnyStopMarker: function(mode) {
      let selector = `.leaflet-marker-icon.${mode}`;
      return this.waitForElementVisible(selector).click(selector);
    },
    waitForPopupPaneVisible: function() {
      // TODO this might fail because marker (outside window) is tried clicked
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
            selector: ".leaflet-popup.popup"
        }
    }
};
