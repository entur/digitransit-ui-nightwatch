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

// must be executed during test
module.exports.isBrowser = isBrowser;

// must be executed before test
module.exports.isEnv = isEnv;
module.exports.isBeta = isBeta;
module.exports.isMobile= isMobile;
