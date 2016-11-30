'use strict'

module.exports = {
    '@tags': ['smoke'],
    'Page should have a title': function(browser) {
        browser
          .url(browser.launch_url)
          .getTitle(function(result) {
            browser.assert.ok(result.length > 0);
          })
          .end();
    }
};
