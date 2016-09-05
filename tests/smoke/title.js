'use strict'

module.exports = {
    '@tags': ['smoke'],
    'Page should have a title': function(browser) {
        browser
            .url(browser.launch_url)
            .getText(".title", function(result) {
              browser.assert.ok(result.value.length > 0);
            })
            .end();
    }
};
