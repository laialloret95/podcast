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
    const ratings = [];

    array.forEach(rate => {
        ratings.push(rate.rating);
    });

    const average = Math.round(ratings.reduce((acc, next) => acc + next) / ratings.length);

    const stars = [];

    for (let i = 1; i <= average; i++) {
        stars.push(i);
    }

    return stars;
});

hbs.registerHelper('missingStars', (array) => {
    const ratings = [];

    array.forEach(rate => {
        ratings.push(rate.rating);
    });

    const average = Math.round(ratings.reduce((acc, next) => acc + next) / ratings.length);
    
    const stars = [];

    for (let i = 5; i > average; i--) {
        stars.push(i);
    }

    return stars;
});


hbs.registerHelper('userRatedAlready', (userID, ratingArray) => {
    let userAllowed = true;

    ratingArray.forEach(rate => {
        if (rate.userID == userID) {
            return userAllowed = false;
        }
    });

    return userAllowed;
});

hbs.registerHelper('formatAudioLength', audioLength => {
    const time = audioLength.split(':');

    const endTime = [];

    time.forEach( (period,i) => {
        if (period != '00') {
            if (i === 0) {
                if (period[0] == '0') {
                    endTime.push(`${period[1]} h`);
                } 
                else {
                     endTime.push(`${period} h`);
                }
            }
            else if (i === 1) {
                if (period[0] == '0') {
                    endTime.push(`${period[1]} min`);
                } 
                else {
                    endTime.push(`${period} min`);

                }
            }
        }
    });

    return endTime;
});