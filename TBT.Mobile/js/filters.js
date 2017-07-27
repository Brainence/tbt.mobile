
tbtApp = angular.module("tbtApp", ['MainService', 'UserService', 'ResetTicketService', 'TimeEntryService']);

tbtApp.filter('filterDayOfWeek', function() {
    return function(x) {
        switch (x)
        {
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
        }
    };
});

tbtApp.filter('filterMonth', function() {
    return function(x) {
        switch (x)
        {
            case 0: return "Jan";
            case 1: return "Feb";
            case 2: return "Mar";
            case 3: return "Apr";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "Aug";
            case 8: return "Sept";
            case 9: return "Oct";
            case 10: return "Nov";
            case 11: return "Dec";
        }
    };
});

/*tbtApp.filter('filterDayOfWeek', function() {
    return function(x) {
        switch (x)
        {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
    };
});

tbtApp.filter('filterMonth', function() {
    return function(x) {
        switch (x)
        {
            case 0: return "January";
            case 1: return "February";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
        }
    };
});*/
