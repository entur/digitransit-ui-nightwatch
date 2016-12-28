'use strict';

const commands = {
    clickAnyBusStopMarker: function() {
      return this.waitForElementVisible("@anyBusStopMarker").click("@anyBusStopMarker");
    },
    clickAnyStopMarker: function(mode) {
      let selector = `.leaflet-marker-icon.${mode}`;
      return this.waitForElementVisible(selector).click(selector);
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
            selector: ".leaflet-popup.popup"
        }
    }
};
