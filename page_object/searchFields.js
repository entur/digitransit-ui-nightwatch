'use strict';

const caseInsensitive = "translate(node(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')";

const searchCommands = {
  openFrontPageSearchBar: function () {
    return this.waitForElementVisible('@frontPageSearchBar')
      .click('@frontPageSearchBar');
  },
  enterSearchText: function (tabSelector, inputSelector, searchText) {
    return this.waitForElementVisible(tabSelector)
      .click(tabSelector)
      .waitForElementVisible(inputSelector)
      .clearValue(inputSelector)
      .setValue(inputSelector, searchText);
  },
  setDestination: function (destination) {
    return this.openFrontPageSearchBar()
      .enterSearchText("@destination", "@searchDestination", destination);
  },
  setOrigin: function (origin) {
    return this.openFrontPageSearchBar()
      .enterSearchText("@origin", "@searchOrigin", origin);
  },
  useCurrentLocationInOrigin: function (origin) {
    this.openFrontPageSearchBar()
      .waitForElementVisible('@origin')
      .click('@origin')
      .waitForElementVisible('@searchOrigin')
      .click('@searchOrigin');

    this.clearValue('@searchOrigin');

    return this.waitForElementVisible('@searchResultCurrentLocation')
      .click('@searchResultCurrentLocation');
  },

  chooseSuggestedDestination: function (destination) {
    destination = this.removeMunicipality(destination).toLowerCase();
    let xpath = `//*[@id='search-destination']/..//p[contains(${caseInsensitive}, '${destination}')]`;

    this.api.useXpath()
      .waitForElementVisible(xpath)
      .click(xpath)
      .useCss();
    return this;
  },
  removeMunicipality: function (text) {
    const index = text.indexOf(',');
    if (index > -1) {
      text = text.substring(0, index);
    }
    return text;
  },
  chooseSuggestedOrigin: function (origin) {
    origin = this.removeMunicipality(origin).toLowerCase();
    let xpath = `//*[@id='search-origin']/..//p[contains(${caseInsensitive}, '${origin}')][1]`;

    this.api.useXpath()
      .waitForElementVisible(xpath)
      .click(xpath)
      .useCss();
    return this;
  },
  setSearch: function (search) {
    // Search for stops and routes. Third tab.
    this.openFrontPageSearchBar()
      .waitForElementVisible('@search')
      .click('@search')
      .waitForElementVisible('@searchDestination')
      .setValue('@searchDestination', search);

    this.api.pause(1000);
    // It does not necesarry select the correct suggested stop/route
    this.setValue('@searchDestination', this.api.Keys.ENTER);
    return this;
  },
  clearTime: function (clearTime) {
    if (clearTime) {
      this.waitForElementVisible('@time').clearValue('@time')
    }
    return this;
  },
  setDepartmentDate: function (date) {
    this.waitForElementVisible('@date')
      .click('@date')
      .waitForElementVisible("option[value='" + date + "']")
      .click("select.date option[value='" + date + "']")
      .setValue('select.date', this.api.Keys.ENTER);   // required for firefox to set value
    this.api.pause(500);                               // required for firefox to set value
    return this;
  },
  setDepartmentTime: function (time) {
    return this.waitForElementVisible('@time')
      .setValue('@time', [time, this.api.Keys.ENTER]); // required for firefox to set value
  },
  itinerarySearch: function (origin, destination) {
    return this.setOrigin(origin)
      .chooseSuggestedOrigin(origin)
      .setDestination(destination)
      .chooseSuggestedDestination(destination);
  }
};

module.exports = {
  commands: [searchCommands],
  elements: {
    frontPageSearchBar: {
      selector: '#front-page-search-bar'
    },
    origin: {
      selector: '#origin'
    },
    searchOrigin: {
      selector: '#search-origin'
    },
    destination: {
      selector: '#destination'
    },
    searchDestination: {
      selector: '#search-destination'
    },
    firstSuggestedItem: {
      selector: "#react-autowhatever-suggest--item-0"
    },
    search: {
      selector: "#front-page-search-bar"
    },
    searchResultCurrentLocation: {
      selector: ".search-result.CurrentLocation"
    },
    date: {
      selector: ".date"
    },
    time: {
      selector: ".time-selectors input"
    }
  }
};
