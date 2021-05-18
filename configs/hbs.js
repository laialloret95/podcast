const hbs = require("hbs");

// Register HBS Helpers
hbs.registerHelper('ifInPreferences', (elem, arr, options) => {
    if (arr.indexOf(elem) > -1) {
        return options.fn(this);
    } 
      return options.inverse(this);
});

hbs.registerHelper('ifUserComment', (authorID, loggedUserID, podcastDB, commentID, options) => {
    if (authorID == loggedUserID) {
        return options.fn({podcastDB, commentID});
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('countStats', (array) => {
    if (array.length > 0) {
        return array.length;
    } else {
        return 0;
    }
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