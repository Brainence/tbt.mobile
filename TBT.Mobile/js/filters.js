
tbtApp = angular.module("tbtApp", ['MainService', 'UserService', 'ResetTicketService', 'TimeEntryService', 'ngTouch']);

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

tbtApp.filter('filterDate', function() {
    return function(x) {
        return x.substr(0,10);
    };
});

tbtApp.filter('filterTime', function() {
    return function(x) {
        return x.substr(0,8);
    };
});

tbtApp.filter('filterReportingDate', function() {
    return function(x) {
        return '' + (x.getDate() < 10 ? '0' : '') + x.getDate() + "." + ((x.getMonth()+1) < 10 ? '0' : '') + (x.getMonth()+1) + "." + x.getFullYear();
    };
});