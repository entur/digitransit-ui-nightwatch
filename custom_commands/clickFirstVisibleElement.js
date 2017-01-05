/**
 *
 * @param selector css selector
 * @param callback called when method is done executing with result of selenium result
 * @returns this (nightwatch)
 */
exports.command = function(selector, callback) {
  this.execute(function (selector) {
    const nodes = window.document.querySelectorAll(selector);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const rect = node.getBoundingClientRect();

      if (rect.right > 0 && rect.bottom > 0 && rect.right < window.innerWidth && rect.bottom < window.innerHeight) {
        console.log("clicking");
        console.log(node);

        node.click();
        return JSON.stringify(i);
      }
    }
    return 0;
  }, [selector], function (result) {
    console.log(result.state)
  });
  return this;
};
