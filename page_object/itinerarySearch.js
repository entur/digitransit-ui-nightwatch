'use strict';

// Not really a page object, but it uses multiple page objects.
const commands = {
    executeItinerarySearchWithModeAndVerify: function(origin, destination, mode, destinationName) {
        if (typeof destinationName !== 'undefined') destinationName = destination;

        this.api.page.searchFields()
            .itinerarySearch(origin, destination);

        return this.api.page.customizeSearch()
            .clickCanvasToggle()
            .disableAllModalitiesExcept(mode)
            .enableModality(mode)
            .closeOffCanvas()
            .api.page.itinerarySummary()
            .waitForFirstItineraryRow()
            .waitForItineraryRowOfType(mode)
            .chooseFirstItinerarySuggestion()
            .api.page.itineraryInstructions()
            .waitForFirstItineraryInstructionColumn()
            .verifyOrigin(origin, mode)
            .verifyDestination(destinationName)
            .waitForItineraryLegOfType(mode);
    },
    executeItinerarySearchWithDepartmentDateAndTime: function(origin, destination, departmentDate, departmentTime) {
         return this.api.page.searchFields()
            .itinerarySearch(origin, destination)
            .api.page.itinerarySummary()
            .api.page.searchFields()
            .setDepartmentDate(departmentDate)
            .setDepartmentTime(departmentTime)
            .api.page.itinerarySummary()
            .waitForFirstItineraryRow();
    },
    executeItinerarySearchAndVerify: function(origin, destination, destinationName) {
        if (typeof destinationName !== 'undefined') destinationName = destination;

        return this.api.page.searchFields()
            .itinerarySearch(origin, destination)
            .api.page.itinerarySummary()
            .waitForFirstItineraryRow()
            .chooseFirstItinerarySuggestion()
            .api.page.itineraryInstructions()
            .waitForFirstItineraryInstructionColumn()
            .verifyOrigin(origin)
            .verifyDestination(destinationName);
    }
};

module.exports = {
    commands: [commands],
    elements: {}
};
