'use strict';

module.exports = {
  tags: ['itinerary'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  'stop to stop - Dyrloekke to Bjoervika': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchAndVerify('Dyrløkke', 'Bjørvika')
      .verifyItineraryLegNotVisible('walk');
    browser.assert.urlContains(encodeURIComponent('Dyrløkke, Frogn::NSR:StopPlace:'));
    browser.assert.urlContains(encodeURIComponent('Bjørvika, Oslo::NSR:StopPlace:'));

    browser.end();
  },
  'addresse to addresse - Schweigaards gate 23 to Kjelsaasveien 161': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchAndVerify('Schweigaards gate 23', 'Kjelsåsveien 161');

    browser.assert.urlContains(encodeURIComponent('Schweigaards gate 23, Oslo::59'));
    browser.assert.urlContains(encodeURIComponent('Kjelsåsveien 161, Oslo::59'));

    browser.url(function (result) {
      if (result.value.indexOf('StopPlace') !== -1) {
        browser.assert.fail('StopPlace was present in url', '<Name>::<LAT>:<LON>', 'NSR:StopPlace should not be in url')
      }
    });

    browser.end();
  },
  'stop to addresse - Dyrloekke to Schweigaards gate 23': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchAndVerify('Dyrløkke', 'Schweigaards gate 23')
      .verifyItineraryLegNotVisible('walk', 'start');
    browser.assert.urlContains(encodeURIComponent('Dyrløkke, Frogn::NSR:StopPlace:'));

    browser.url(function (result) {
      if ((result.value.match(/StopPlace/g) || []).length > 1) {
        browser.assert.fail('StopPlace was present in url more than once', '', 'NSR:StopPlace should only occur once in url')
      }
    });

    browser.end();
  },
  'addresse to stop - Karl Johans gate 1 to Lillestroem terminal': function (browser) {
    browser.page.itinerarySearch()
      .executeItinerarySearchAndVerify('Karl Johans gate 1, Oslo', 'Lillestrøm, Skedsmo', null, 'Lillestrøm')
      .verifyItineraryLegNotVisible('walk', 'end');
    browser.assert.urlContains(encodeURIComponent('Karl Johans gate 1, Oslo::59'));
    browser.assert.urlContains(encodeURIComponent('Lillestrøm, Skedsmo::NSR:StopPlace:'));

    browser.url(function (result) {
      if ((result.value.match(/StopPlace/g) || []).length > 1) {
        browser.assert.fail('StopPlace was present in url more than once', '', 'NSR:StopPlace should only occur once in url')
      }
    });

    browser.end();
  },
};
