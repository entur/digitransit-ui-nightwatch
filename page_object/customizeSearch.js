'use strict'

var modalities = ["bus", "tram", "rail", "subway", "ferry", "citybike", "air"];

var commands = {
  clickCanvasToggle: function () {
    return this.waitForElementVisible("@canvasToggle")
      .click("@canvasToggle");
  },
  closeOffCanvas: function () {
    return this.waitForElementVisible("@offCanvas")
      .click("@offCanvas");
  },
  enableModality: function (modality) {
    var index;
    for (var i in modalities) {
      if (modalities[i] === modality) {
        i++;
        var client = this;
        this.exists(".btn-bar > ." + modality, function (selector, found) {
          if (!found) {
            // Disabled buttons does not have modality as class
            console.log("activating modality " + modality);
            let disabledButtonSelector = ".btn-bar > .btn:nth-of-type(" + i + ")";
            client.waitForElementVisible(disabledButtonSelector);
            client.click(disabledButtonSelector);
            return;
          } else {
            console.log("modality " + modality + " is already activated");
          }
        });
      }
    }
    return this;
  },
  disableAllModalitiesExcept: function (except) {
    this.waitForElementVisible("@buttonBar");

    for (var i in modalities) {
      var modality = modalities[i];
      var selector = ".btn-bar > ." + modality;
      var client = this;

      if (except !== modality) {
        this.exists(selector, function (selector, found) {
          if (found) {
            console.log("Clicking " + selector);
            // Allthough it exists, we need to make sure it is visible as well.
            client.waitForElementVisible(selector);
            client.click(selector);
          }
        });
      }
    }
    return this;
  },
  exists: function (selector, callback) {
    this.api.elements("css selector", selector, function (result) {
      if (result.value && result.value.length > 0 && result.value[0].ELEMENT) {
        callback(selector, true);
      } else {
        callback(selector, false);
      }
    });
  },
  count: function (selector, callback) {
    this.api.elements("css selector", selector, function (result) {
      callback(result.value ? result.value.length : 0);
    });
  },
};

module.exports = {
  commands: [commands],
  elements: {
    canvasToggle: ".right-offcanvas-toggle",
    offCanvas: ".offcanvas-close",
    buttonBar: ".btn-bar.mode-filter.no-select"
  }
};
