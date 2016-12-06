'use strict'

var searchCommands = {
    openFrontPageSearchBar: function() {
        return this.waitForElementVisible('@frontPageSearchBar')
            .click('@frontPageSearchBar');
    },
    enterSearchText: function(tabSelector, inputSelector, searchText) {
        return this.waitForElementVisible(tabSelector)
            .click(tabSelector)
            .waitForElementVisible(inputSelector)
            .clearValue(inputSelector)
            .setValue(inputSelector, searchText);
    },
    setDestination: function(destination) {
        return this.openFrontPageSearchBar()
          .enterSearchText("@destination", "@searchDestination", destination);
    },
    setOrigin: function(origin) {
        return this.openFrontPageSearchBar()
          .enterSearchText("@origin", "@searchOrigin", origin);
    },
    useCurrentLocationInOrigin: function(origin) {
        this.openFrontPageSearchBar()
            .waitForElementVisible('@origin')
            .click('@origin')
            .waitForElementVisible('@searchOrigin')
            .click('@searchOrigin');

        this.clearValue('@searchOrigin');

        return this.waitForElementVisible('@searchResultCurrentLocation', 2000)
            .click('@searchResultCurrentLocation');
    },

    chooseSuggestedDestination: function(destination) {
        destination = this.removeMunicipality(destination);
        let xpath = `//*[@id='search-destination']/..//p[contains(node(), '${destination}')]`;

        this.api.useXpath()
            .waitForElementVisible(xpath)
            .click(xpath)
            .useCss();
        return this;
    },
    removeMunicipality: function(text) {
      const index = text.indexOf(',');
      if (index > -1) {
        text = text.substring(0, index);
      }
      return text;
    },
    chooseSuggestedOrigin: function(origin) {
        origin = this.removeMunicipality(origin);
        let xpath = `//*[@id='search-origin']/..//p[contains(node(), '${origin}')][1]`;

        this.api.useXpath()
            .waitForElementVisible(xpath)
            .click(xpath)
            .useCss();
        return this;
    },
    setSearch: function(search) {
        // Search for stops and routes. Third tab.
        this.openFrontPageSearchBar()
            .waitForElementVisible('@search')
            .click('@search')
            .waitForElementVisible('@searchInput')
            .setValue('@searchInput', search);

        this.api.pause(1000);
        // It does not necesarry select the correct suggested stop/route
        this.setValue('@searchInput', this.api.Keys.ENTER);
        return this;
    },
    itinerarySearch: function(origin, destination) {
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
            selector: "[tabindex=\"2\"]"
        },
        searchInput: {
            selector: "#search"
        },
        searchResultCurrentLocation: {
            selector: ".search-result.CurrentLocation"
        }
    }
};
