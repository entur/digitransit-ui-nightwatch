'use strict';

const commands = {
  waitForFirstItineraryInstructionColumn: function (isMobile) {
    let selector = (isMobile) ? "@itineraryInstructionColumnMobile" : "@itineraryInstructionColumn";
    return this.waitForElementVisible(selector);
  },
  verifyOrigin: function (origin, mode) {
    let selector = (mode === "air") ? "@itineraryOriginAir" : "@itineraryOrigin";
    this.waitForElementVisible(selector);
    this.getText(selector, function(result) {
      let place1 = origin.toLowerCase();
      let place2 = result.value.toLowerCase();
      if (place1.length !== place2.length) {
        place1 = this.page.searchFields().removeMunicipality(place1);
        place2 = this.page.searchFields().removeMunicipality(place2);
      }
      this.assert.equal(place1, place2)
    });
    return this;
  },
  verifyDestination: function (destination) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='itinerary-leg-first-row' and contains(text(), '${destination}')]`)
      .useCss();
    return this;
  },
  verifyPickupText: function (text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='dropoff-pickup-info']/span[text()='${text}']`)
      .useCss();
    return this;
  },
  waitForItineraryLegOfType: function (mode) {
    if (mode === "air") {
      mode = "airplane";
    }
    let selector = ".itinerary-instruction-column." + mode;
    return this.waitForElementVisible(selector);
  },
  verifyItineraryLegNotVisible: function (mode, leg = '') {
    if (leg !== '') {
      leg = `.${leg}`
    }
    return this.assert.cssClassNotPresent(`.itinerary-instruction-column${leg}`, mode);
  }
};

module.exports = {
  commands: [commands],
  elements: {
    itineraryInstructionColumn: ".itinerary-instruction-column",
    itineraryInstructionColumnMobile: ".itinerary-main",
    itineraryOrigin: ".itinerary-leg-first-row:nth-of-type(1)",
    itineraryOriginAir: ".airplane .itinerary-leg-first-row:nth-of-type(1)"
  }
};
