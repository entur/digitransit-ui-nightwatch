
function isBeta() {
  if (typeof process !== 'undefined' && typeof  process.argv !== 'undefined') {
    let env = process.argv[process.argv.indexOf('--env') + 1];
    return env.indexOf('beta') !== -1;
  }
  return false;
}

module.exports.isBeta = isBeta;