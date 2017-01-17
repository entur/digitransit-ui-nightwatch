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
  waitForRoutesVisible: function (isMobile) {
    return isMobile ? this : this.waitForElementVisible("@routes");
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
      .waitForElementVisible(`//div[@class='departure-list']//span[contains(@class, 'vehicle-number') and contains(@class, 'ferry') and contains(text(), '${text}')]/..`)
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
    let selector = '.route.cursor-pointer:nth-of-type(2)';
    this.waitForUpdateOfDOM(selector);
    let api = this.api;
    this.clickFirstVisibleElement(selector, function (result) {
      if (result.state !== 'success') {
        console.log('   - ' + result.state);
        api.click('@routeToHere'); // fallback click to use api
      }
    });
    return this
  },

  // near by
  clickFromLink: function () {
    let selector = '.field-link.from-link';
    this.waitForUpdateOfDOM(selector);
    let api = this.api;
    this.clickFirstVisibleElement(selector, function (result) {
      if (result.state !== 'success') {
        console.log('   - ' + result.state);
        api.click('@fromLink'); // fallback click to use api
      }
    });
    return this
  },
  waitForUpdateOfDOM: function (selector, limit = 1, pause = 1000) {
    this.api.pause(pause);
    let api = this.api;
    this.api.page.customizeSearch().count(selector, (count) => {
      if (count < limit ) {
        console.log('   - Less than ' + limit + ' of ' + selector + ' found, waiting');
        api.pause(pause);
      }
    });
    return this
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
      selector: '.search-modal input'
    },
    fromFirstStop: {
      selector: '.Stop:first-of-type .icon'
    }
  }
};
