'use strict'


var commands = {
    openFavouritesPage: function() {
        this.waitForElementVisible("@favouritePaneSelect");
        return this.click("@favouritePaneSelect");
    },
    addFavourite: function() {
        this.waitForElementVisible("@newFavouriteButtonContent");
        return this.click("@newFavouriteButtonContent");
    },
    enterAddress: function(addressSearch) {
        this.waitForElementVisible("@addressPlaceholderNoSelect");
        this.click("@addressPlaceholderNoSelect");
        this.waitForElementPresent("@searchFavourite");
        this.setValue("@searchFavourite", addressSearch);

        // TODO: do not use sleep!
        this.api.pause(1000);

        return this.setValue("@searchFavourite", this.api.Keys.ENTER);
    },
    enterName: function(name) {
        return this.setValue("@nameInput", name);
    },
    clickHomeIcon: function() {
        return this.click("@homeIcon");
    },
    saveFavourite() {
        return this.click("@saveButton");
    },
    saveHomeFavourite: function(address, name) {
        return this.openFavouritesPage()
            .addFavourite()
            .enterAddress(address)
            .enterName(name)
            .clickHomeIcon()
            .saveFavourite();
    },
    verifyFavouriteAvailable: function(favouriteName) {
        this.openFavouritesPage();
        this.waitForElementVisible("@favouriteLocationName");
        return this.assert.containsText("@favouriteLocationName", favouriteName);
    },
    verifyFavouriteInSearchResult: function(favouriteName) {
        this.api.useXpath();
        this.waitForElementPresent("//*/li[@class=\"react-autowhatever__item\"]/span[text()=\"" + favouriteName + "\"]");
        this.api.useCss();
    }
}

module.exports = {
    commands: [commands],
    elements: {
        favouritePaneSelect: {
            selector: "li.favourites"
        },
        newFavouriteButtonContent: {
            selector: ".new-favourite-button-content"
        },
        addressPlaceholderNoSelect: {
            selector: ".add-favourite-container__input-placeholder"
        },
        searchFavourite: {
            selector: ".react-autowhatever__input"
        },
        nameInput: {
            selector: ".add-favourite-container__give-name input"
        },
        homeIcon: {
            selector: ".favourite-icon-table-column:nth-of-type(2)"
        },
        saveButton: {
            selector: ".add-favourite-container-button"
        },
        favouriteLocationName: {
            selector: ".favourite-location-name"
        }
    }
}
