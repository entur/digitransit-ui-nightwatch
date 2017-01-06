'use strict'

module.exports = {
  tags: ['favourite', 'search'],
  "Favourite should be part of search": function (browser) {
    var browser = browser.url(browser.launch_url);

    var myFavourites = browser.page.myFavourites();
    var favouriteName = "A favourite that should show up in search results";
    myFavourites.saveHomeFavourite("Vestre vei 21, Asker", favouriteName);
    browser.page.searchFields().setDestination("");
    myFavourites.verifyFavouriteInSearchResult(favouriteName);
    browser.end();
  }
}
