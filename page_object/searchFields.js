'use strict'

var searchCommands = {
    openFrontPageSearchBar: function() {
        return this.waitForElementVisible('@frontPageSearchBar', this.api.globals.elementVisibleTimeout)
            .click('@frontPageSearchBar');
    },
    enterSearchText: function(tabSelector, inputSelector, searchText) {
        var timeout = this.api.globals.elementVisibleTimeout;
        return this.waitForElementVisible(tabSelector, timeout)
            .click(tabSelector)
            .waitForElementVisible(inputSelector, timeout)
            .clearValue(inputSelector)
            .setValue(inputSelector, searchText);
    },
    setDestination: function(destination) {
        this.waitForElementVisible('@destination', this.api.globals.elementVisibleTimeout)
            .click('@destination');

        this.waitForElementVisible('@searchDestination', this.api.globals.elementVisibleTimeout);

        this.clearValue('@searchDestination');

        return this.setValue('@searchDestination', destination);
    },
    useCurrentLocationInOrigin: function(origin) {
        var timeout = this.api.globals.elementVisibleTimeout;
        this.waitForElementVisible('@frontPageSearchBar', timeout)
            .click('@frontPageSearchBar')
            .waitForElementVisible('@origin', timeout)
            .click('@origin');
        this.waitForElementVisible('@searchOrigin', timeout)
            .clearValue('@searchOrigin')
            .setValue('@searchOrigin', this.api.Keys.SPACE)
            .setValue('@searchOrigin', '\b')
            .setValue('@searchOrigin', '')
            .waitForElementVisible("@searchResultCurrentLocation", timeout)
            .click("@searchResultCurrentLocation");

        return this;
    },
    chooseSuggestion: function(text, tabNumber) {
        /* Keep in mind that there are three search tabs rendered with auto whatever suggestions: origin, destination and stop/route search.
         * These lists does not have unique identifiers.
         */
        let xpath = `(//*[@id='react-whatever-suggest'])[${tabNumber}]//*[contains(text(), "${text}")]`

        return this.api.useXpath()
            .waitForElementVisible(xpath, this.api.globals.elementVisibleTimeout)
            .click(xpath)
            .useCss();
    },
    setSearch: function(search) {
        // Search for stops and routes. Third tab.
        var timeout = this.api.globals.elementVisibleTimeout;
        this.waitForElementVisible('@frontPageSearchBar', timeout)
            .click('@frontPageSearchBar')
            .waitForElementVisible('@search', timeout)
            .click('@search')
            .waitForElementVisible('@searchInput', timeout)
            .setValue('@searchInput', search);

        this.api.pause(1000);
        return this.setValue('@searchInput', this.api.Keys.ENTER);
    },
    itinerarySearch: function(origin, destination) {
      this.openFrontPageSearchBar()
            .enterSearchText("@origin", "@searchOrigin", origin)
            .chooseSuggestion(origin, 1);
      this.openFrontPageSearchBar()
      .enterSearchText("@destination", "@searchDestination", destination)
      .chooseSuggestion(destination, 2);
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
