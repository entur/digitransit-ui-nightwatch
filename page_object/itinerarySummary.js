'use strict';

const commands = {
  waitForFirstItineraryRow: function () {
    return this.waitForElementPresent("@firstItinerarySummaryRow", this.api.globals.itinerarySearchTimeout);
  },
  waitForItineraryRowOfType: function (modality) {
    if (modality === "air") {
      // TODO: mapping?
      modality = "airplane";
    }

    return this.waitForElementVisible(".line ." + modality, this.api.globals.itinerarySearchTimeout);
  },
  chooseFirstItinerarySuggestion: function () {
    return this.clickFirstVisibleElement('div.itinerary-summary-row:first-child');
  }
};

module.exports = {
  commands: [commands],
  elements: {
    // first-child returns only one out of 4 elements.
    // the :first-child pseudo-class represents the very first child of its parent
    firstItinerarySummaryRow: "div.itinerary-summary-row:first-child"
  }
};
