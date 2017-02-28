'use strict';

const commands = {
  waitForFirstItineraryRowPresent: function () {
    return this.waitForElementPresent("@firstItinerarySummaryRow", this.api.globals.itinerarySearchTimeout);
  },
  waitForFirstItineraryRow: function () {
    return this.waitForElementVisible("@firstItinerarySummaryRow", this.api.globals.itinerarySearchTimeout);
  },
  waitForItineraryRowOfType: function (modality) {
    if (modality === "air") {
      // TODO: mapping?
      modality = "airplane";
    }

    return this.waitForElementVisible(".line ." + modality, this.api.globals.itinerarySearchTimeout);
  },
  chooseFirstItinerarySuggestion: function () {
    return this.click("@firstItinerarySummaryRow");
  },
  waitForUpdate: function (selector, limit) {
    this.api.pause(1000);
    this.api.page.customizeSearch().count(selector, (count) => {
      if (count < limit) {
        console.log('   - Search not updated yet (found ' + count + '), waiting');
        this.api.pause(5000);
      }
    });
    return this;
  },
  clickFirstVisibleRow: function () {
    let selector = 'div.itinerary-summary-row';
    this.waitForUpdate(selector, 1);
    this.clickIt(selector + ':first-child', function (result) {
      console.log('   - ' + result.state)
    });
    return this;
  },
};

module.exports = {
  commands: [commands],
  elements: {
    // first-child returns only one out of 4 elements.
    // the :first-child pseudo-class represents the very first child of its parent
    firstItinerarySummaryRow: "div.itinerary-summary-row:first-child"
  }
};
