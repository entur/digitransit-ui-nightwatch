/* NRP-840: Display information about ordering pickup where this is needed.
 Pickup order needed is indicated with a 'B' in the legs ruler when it is collapsed,
 and more information about this is displayed when the ruler is collapsed.
 */

module.exports = {
  tags: ['pickup-information', 'custom'],
  'Should show pickup information': function (browser) {
    var origin = 'Sørvær';
    var destination = 'Hasvik kai';
    // Get upcoming Friday since this is the only day pickup is available for this route
    var thisFriday = new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay()) % 7)).toISOString().slice(0, 10);
    var browser = browser.url(browser.launch_url);
    browser.page.itinerarySearch()
      .executeItinerarySearchWithDepartmentDateAndTime(origin, destination, thisFriday, '05:52')
      .api.page.itinerarySummary()
      .waitForElementVisible('.pickup-dropoff')
      .chooseFirstItinerarySuggestion()
      .api.page.itineraryInstructions()
      .waitForFirstItineraryInstructionColumn()
      .verifyOrigin(origin)
      .verifyDestination(destination)
      .verifyPickupText('This route require booking from operator (www.flexx.no/tel.:03177)');
    browser.end();
  },
}

