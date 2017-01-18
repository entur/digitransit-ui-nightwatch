'use strict';

// Not really a page object, but it uses multiple page objects.
const commands = {
  executeItinerarySearchWithModeAndVerify: function (origin, destination, mode, originName, destinationName) {
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
      .verifyOrigin(originName || origin, mode)
      .verifyDestination(destinationName || destination)
      .waitForItineraryLegOfType(mode);
  },
  executeItinerarySearchWithDepartmentDateAndTime: function (origin, destination, departmentDate, departmentTime) {
    return this.api.page.searchFields()
      .itinerarySearch(origin, destination)
      .api.page.itinerarySummary()
      .api.page.searchFields()
      .setDepartmentDate(departmentDate)
      .setDepartmentTime(departmentTime)
      .api.page.itinerarySummary()
      .waitForFirstItineraryRow();
  },
  executeItinerarySearchAndVerify: function (origin, destination, originName, destinationName) {
    return this.api.page.searchFields()
      .itinerarySearch(origin, destination)
      .api.page.itinerarySummary()
      .waitForFirstItineraryRow()
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn()
      .verifyOrigin(originName || origin)
      .verifyDestination(destinationName || destination);
  }
};

module.exports = {
  commands: [commands],
  elements: {}
};
