/* NRP-836: Retrieve stop places with municipality. As of 12-07-2016 these are retrieved from OTP with polyfilled municipality information from pelias,
 This functionality will be removed when pelias is used for both stops and addresses.
 */

module.exports = {
  tags: ['municipalityStops', 'custom'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'Travel from Oslo Bussterminal, Oslo to Hauketo stasjon, Oslo': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchWithModeAndVerify('Oslo Bussterminal, Oslo', 'Hauketo stasjon, Oslo', 'bus', 'Oslo Bussterminal');
    browser.end();
  },
  'Travel from Bodø stasjon, Bodø to Evenes kryss, Evenes': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchAndVerify('Bodø stasjon, Bodø', 'Evenes kryss, Evenes', undefined, 'Evenes kryss');
    browser.end();
  }
};
