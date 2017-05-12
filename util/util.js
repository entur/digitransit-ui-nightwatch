function isEnv(env) {
  if (typeof process !== 'undefined' && typeof process.argv !== 'undefined') {
    let _env = process.argv[process.argv.indexOf('--env') + 1];
    return _env.indexOf(env) !== -1;
  }
  return false;
}

function isBeta() {
  return isEnv('beta');
}

function isMobile() {
  return isEnv('mobile')
}

function isBrowser(api, name) {
  return api.options.desiredCapabilities.browserName === name;
}

/**
 * Not this function is async and requires empty test to setup
 * checkout how it is used: tests/custom/pickupInformation.js
 */
async function isSmallWindow(browser, callback) {
  browser.getElementSize("body", function getSize(result) {
    callback(result.value.width < 900, {width: result.value.width, height: result.value.height})
  });
  browser.pause(1000);
}

// must be executed during test
module.exports.isBrowser = isBrowser;
module.exports.isSmallWindow = isSmallWindow;

// must be executed before test
module.exports.isEnv = isEnv;
module.exports.isBeta = isBeta;
module.exports.isMobile= isMobile;
