'use strict';

var commands = {
  clickAnyMarker: function () {
    return this.click("@anyStopMarker");
  },
  waitForDepartureVisible: function () {
    return this.waitForElementVisible("@departure");
  },
  expectCardHeader: function (expected) {
    this.waitForElementVisible("@cardHeader");
    return this.assert.containsText("@cardHeader", expected);
  },
  waitForRoutesVisible: function () {
    return this.waitForElementVisible("@routes");
  },
  waitForRouteTitle: function (text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='card-header-wrapper']//span[contains(text(), '${text}')]`)
      .useCss();
    return this;
  },
  waitForRouteSubTitle: function (text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='card-header-wrapper']//div[@class='card-sub-header']//p[contains(text(), '${text}')]`)
      .useCss();
    return this;
  },
  waitForRoutesCard: function (text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='departure-list']//span[@class='vehicle-number ferry' and contains(text(), '${text}')]/..`)
      .useCss();
    return this;
  },
  waitForRouteToFrom: function (text) {
    this.api.useXpath()
      .waitForElementVisible(`//div[@class='route cursor-pointer']//span[contains(text(), '${text}')]/..`)
      .useCss();
    return this;
  },
  waitForRoutesFromHere: function (text) {
    return this.waitForRouteToFrom('Route from here')
  },
  clickRoutesFromHere: function () {
    return this.click("@routeFromHere")
  },
  waitForRoutesToHere: function (text) {
    return this.waitForRouteToFrom('Route to here')
  },
  clickRoutesToHere: function () {
    return this.click("@routeToHere")
  },

  // near by
  clickFromLink: function () {
    return this.waitForElementVisible('@fromLink').click('@fromLink');
  },
  enterSearchInput: function (destination) {
    return this.waitForElementVisible('@fromSearchInput')
      .clearValue('@fromSearchInput')
      .setValue('@fromSearchInput', destination);
  },
  clickFirstStop: function () {
    return this.waitForElementVisible('@fromFirstStop').click('@fromFirstStop');
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
    },

    // near by
    fromLink: {
      selector: '.field-link.from-link'
    },
    fromSearchInput: {
      selector: '.search-modal-container input'
    },
    fromFirstStop: {
      selector: '.Stop:first-of-type .icon'
    }
  }
};
