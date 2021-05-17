const hbs = require("hbs");

// Register HBS Helpers
hbs.registerHelper('ifInPreferences', function(elem, arr, options) {
    if (arr.indexOf(elem) > -1) {
        return options.fn(this);
    } 
      return options.inverse(this);
});

hbs.registerHelper('ifUserComment', function(authorID, loggedUserID, options) {
    return (authorID == loggedUserID) ? options.fn(this) : options.inverse(this);
});