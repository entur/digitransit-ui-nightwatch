'use strict';

const commands = {
    clickAnyMarker: function() {
        return this.click("@anyStopMarker");
    },
    waitForDepartureVisible: function() {
        return this.waitForElementVisible("@departure");
    },
    expectCardHeader: function(expected) {
        this.waitForElementVisible("@cardHeader");
        return this.assert.containsText("@cardHeader", expected);
    },
  waitForRoutesVisible: function() {
    return this.waitForElementVisible("@routes");
  },
  waitForRouteToFrom: function(text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='route cursor-pointer']//span[contains(text(), '${text}')]/..`)
      .useCss();
    return this;
  },
  waitForRoutesFromHere: function(text) {
    return this.waitForRouteToFrom('Route from here')
  },
  clickRoutesFromHere: function() {
    return this.click("@routeFromHere")
  },
  waitForRoutesToHere: function(text) {
    return this.waitForRouteToFrom('Route to here')
  },
  clickRoutesToHere: function() {
    return this.click("@routeToHere")
  },
  waitForRoutesToThis: function() {
    return this.waitForElementVisible(".itinerary-summary-row");
  }
};

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
        },
      routeFromHere: {
        selector: ".route.cursor-pointer:nth-of-type(1)"
      },
      routeToHere: {
        selector: ".route.cursor-pointer:nth-of-type(2)"
      },
      routes: {
        selector: ".fpccontainer"
      }
    }
};
