'use strict';

var commands = {
  clickAnyBusStopMarker: function () {
    return this.waitForElementVisible("@anyBusStopMarker").click("@anyBusStopMarker");
  },
  clickAnyStopMarker: function (mode) {
    let selector = `.leaflet-marker-icon.${mode}`;
    return this.waitForElementVisible(selector).click(selector);
  },
  clickFirstVisibleMarker: function (mode) {
    let selector = `.leaflet-marker-icon.${mode}`;
    this.waitForMarkerUpdate(selector);
    this.clickCentralVisibleElement(selector, function (result) {
      console.log('   - ' + result.state)
    });
    return this;
  },
  waitForMarkerUpdate: function (selector) {
    this.api.pause(1000);
    this.api.page.customizeSearch().count(selector, (count) => {
      if (count === 0 || count > 10) {
        console.log('   - Marker not updated yet (found ' + count+'), waiting');
        this.api.pause(5000);
      }
    });
    return this;
  },
  waitForPopupPaneVisible: function () {
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
