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

hbs.registerHelper('ratingStars', (array) => {
    const average = Math.round(array.reduce((acc, next) => acc + next) / array.length);
    const stars = [];

    for (let i = 1; i <= average; i++) {
        stars.push(i);
    }

    return stars;
});

hbs.registerHelper('missingStars', (array) => {
    const average = Math.round(array.reduce((acc, next) => acc + next) / array.length);
    const stars = [];

    for (let i = 5; i > average; i--) {
        stars.push(i);
    }

    return stars;
});