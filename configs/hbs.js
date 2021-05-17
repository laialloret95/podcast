const hbs = require("hbs");
const path = require('path');

// Register HBS Helpers
hbs.registerHelper('ifInPreferences', function(elem, arr, options) {
    if (arr.indexOf(elem) > -1) {
        return options.fn(this);
    } 
      return options.inverse(this);
});

hbs.registerHelper('ifUserComment', function(authorID, loggedUserID, options) {
    console.log(authorID, loggedUserID);
    return (authorID == loggedUserID) ? options.fn(this) : options.inverse(this);
});