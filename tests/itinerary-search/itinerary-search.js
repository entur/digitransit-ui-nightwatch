'use strict'

module.exports = {
    tags: ["itinerary"],
    beforeEach: function(browser) {
      browser.url(browser.launch_url);
    },
    'From Sogstikollen 22B to Bjørvika': function(browser) {
        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify("Sogstikollen 22C, Frogn", "Bjørvika")
          .api.end();
    },
    'Dyrløkke to Bjørvika': function(browser) {
        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify("Dyrløkke", "Bjørvika")
          .api.end();
    },
    'From Hausmanns gate to Malerhaugveien 28': function(browser) {
        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify("Hausmanns gate", "Malerhaugveien 28")
          .api.end();
    },
    'From Hausmanns gate to Ula nord': function(browser) {
      browser.page.itinerarySearch()
        .executeItinerarySearchAndVerify("Hausmanns gate", "Ula nord")
        .api.end();
    },
    'From Røros skole to Festplassen, Bergen': function(browser) {
      browser.page.itinerarySearch()
        .executeItinerarySearchAndVerify("Røros skole", "Festplassen")
        .api.end();
    },
    'From Festplassen, Bergen to Scandic Alta': function(browser) {
      browser.page.itinerarySearch()
        .executeItinerarySearchAndVerify("Festplassen", "Scandic Alta")
        .api.end();
    }
}
