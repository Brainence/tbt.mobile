var mainmenu = '<div data-role="panel" id="main-menu-panel" ng-controller="MenuCtrl" data-display="push" data-theme="a"> <h2 class="menu-header">Time Booking Tool</h2><ul class="list-group"><li class="list-group-item"><a href="#calendar-page" class="menu-button">Calendar</a></li><li class="list-group-item"><a href="#reporting-page" class="menu-button" ng-click="InitReportingPage()">Reporting</a></li><li class="list-group-item"><a href="#authorization-page" class="menu-button" onclick="Logout()">Log out</a></li></ul> </div>';

$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.append(mainmenu);
    $("#main-menu-panel").panel();
});

$(document).on("pageinit", "#demo-page", function() {
    $(document).on("swipeleft swiperight", "#index", function(e) {
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swipeleft") {
                $("#right-panel").panel("open");
            } else if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});

    
function Logout() {
    window.localStorage.clear();
}
