'use strict';

const { isBeta } = require('../util');

module.exports = {
    tags: ["itinerary", "oppland"],
    beforeEach: function(browser) {
      browser.url(browser.launch_url);
    },
    'From Oslo S to Lillehammer skysstasjon': function(browser) {
        let departure = (isBeta()) ?  "Oslo S" : "Oslo Bussterminal"; // TODO remove when test server has equivalent data

        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify(departure, "Lillehammer skysstasjon")
          .api.end();
    },
    'Raufoss stasjon to Lillehammer skysstasjon': function(browser) {
        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify("Raufoss stasjon", "Lillehammer skysstasjon")
          .api.end();
    },
    'Gjøvik skysstasjon to Lillehammer skysstasjon': function(browser) {
        browser.page.itinerarySearch()
          .executeItinerarySearchAndVerify("Gjøvik skysstasjon", "Lillehammer skysstasjon")
          .api.end();
    }
}
