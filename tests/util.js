
function isBeta() {
  if (typeof process !== 'undefined') {
    return process.argv[process.argv.indexOf('--env') + 1] === 'beta'
  }
  return false;
}

module.exports.isBeta = isBeta;