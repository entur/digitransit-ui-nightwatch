'use strict'

var searchCommands = {
    setOrigin: function(origin) {
        var timeout = this.api.globals.elementVisibleTimeout;
        this.waitForElementVisible('@frontPageSearchBar', timeout)
            .click('@frontPageSearchBar')
            .waitForElementVisible('@origin', timeout)
            .click('@origin')
            .waitForElementVisible('@searchOrigin', timeout)
            .clearValue('@searchOrigin')
            .setValue('@searchOrigin', origin);

        return this;
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
    enterKeyOrigin: function() {
        this.api.pause(1000);
        return this.setValue('@searchOrigin', this.api.Keys.ENTER);
    },
    setDestination: function(destination) {
        var timeout = this.api.globals.elementVisibleTimeout;
        return this.waitForElementVisible('@frontPageSearchBar', timeout)
            .click('@frontPageSearchBar')
            .waitForElementVisible('@destination', timeout)
            .click('@destination')
            .waitForElementVisible('@searchDestination', timeout)
            .setValue('@searchDestination', destination);
    },
    chooseDestination: function(destination) {

        let xpath = "//span[contains(text(), '" + destination + "')]";



        this.api.useXpath();
        this.api.waitForElementPresent(xpath, this.api.globals.elementVisibleTimeout);

        this.api.execute(function(destination) {
          console.log(document);

          var suggestions = document.getElementsByClassName("search-result");
          console.log("Found " + suggestions.length + " suggestions");
          for (var i = 0; i < suggestions.length; i++) {
            // console.log("Comparing " + suggestions[i].innerText);
            if(suggestions[i].innerText.indexOf(destination) >= 0) {
              console.log("Found it. Will click it");
              suggestions[i].click();
              suggestions[i].parentElement.click();
              console.log(suggestions[i].parentElement);
              
              var e = document.createEvent('HTMLEvents');

              e.initEvent(suggestions[i], 'mousedown', false, true);
              el.dispatchEvent(e);

              break;
            }
          }
        }, [destination]);

        this.api.useCss();
        return this;

    },
    itinerarySearch: function(origin, destination) {
        return this.setOrigin(origin)
            .enterKeyOrigin()
            .setDestination(destination)
            .chooseDestination(destination);
    },
    setSearch: function(search) {
        var timeout = this.api.globals.elementVisibleTimeout;
        this.waitForElementVisible('@frontPageSearchBar', timeout)
            .click('@frontPageSearchBar')
            .waitForElementVisible('@search', timeout)
            .click('@search')
            .waitForElementVisible('@searchInput', timeout)
            .setValue('@searchInput', search);

        this.api.pause(1000);
        return this.setValue('@searchInput', this.api.Keys.ENTER);
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
