
tbtApp.controller("ReportingCtrl", [ 'TimeEntry', '$scope', '$rootScope', function(TimeEntry, $scope, $rootScope) {
    
    $("#calendarFromDate").datepicker({
        onSelect: function(date){
            $scope.dateFrom = new Date(date.substr(date.lastIndexOf('/')+1), parseInt(date.substr(0, date.indexOf('/')))-1, date.substr(date.indexOf('/')+1, 2), 0, 0, 0, 0);
            $scope.$apply();
        },
        onClose: function(input, inst) {
            if($("#calendarFromDate").datepicker("widget").is(":visible")){
                $("#calendarFromDate").datepicker( "hide" );
            }
        }
    });
    $("#calendarToDate").datepicker({
        onSelect: function(date){
            $scope.dateTo = new Date(date.substr(date.lastIndexOf('/')+1), parseInt(date.substr(0, date.indexOf('/')))-1, date.substr(date.indexOf('/')+1, 2), 0, 0, 0, 0);
            $scope.$apply();
        },
        onClose: function(input, inst) {
            if($("#calendarToDate").datepicker("widget").is(":visible")){
                $("#calendarToDate").datepicker( "hide" );
            }
        }
    });
    
    init();
    
    function init() {
        var date = new Date();
        var today = {numb: date.getDate(), month: date.getMonth(), year:date.getFullYear(), dayOfWeek: date.getDay()};
        var from = Object.assign(today);
        for(var i =0; i<today.dayOfWeek; i++){
            from = prevCalendarDate(from);
        }
        var to = Object.assign(today);
        for(var i=today.dayOfWeek+1; i<7; i++){
            to = nextCalendarDate(to);
        }
        $scope.dateFrom = new Date(from.year, from.month, from.numb, 0, 0, 0, 0);
        $scope.dateTo = new Date(to.year, to.month, to.numb, 0, 0, 0, 0);
        $('#calendarFromDate').datepicker("setDate", $scope.dateFrom);
        $('#calendarToDate').datepicker("setDate", $scope.dateTo);
    }
    
    $scope.generateReport = function(){
        var from = {numb: $scope.dateFrom.getDate(), month: $scope.dateFrom.getMonth(), year:$scope.dateFrom.getFullYear(), dayOfWeek: $scope.dateFrom.getDay()};
        var to = {numb: $scope.dateTo.getDate(), month: $scope.dateTo.getMonth(), year:$scope.dateTo.getFullYear(), dayOfWeek: $scope.dateTo.getDay()};
        var dateFrom = '' + from.year + ((from.month+1) < 10 ? '0' : '') + (from.month+1) + (from.numb < 10 ? '0' : '') + from.numb + 'T000000';
        var dateTo = '' + to.year + ((to.month+1) < 10 ? '0' : '') + (to.month+1) + (to.numb < 10 ? '0' : '') + to.numb + 'T000000';
        console.log(dateFrom);
        console.log(dateTo);
        TimeEntry.GetByUser(currentUser.Id, dateFrom, dateTo).done(function(result){
            $rootScope.report = result;
            TimeEntry.GetDuration(currentUser.Id, dateFrom, dateTo).done(function(res){
                var time = res.substr(0, res.lastIndexOf('.'));
                if(time.includes('.')){
                    var day = parseInt(time.substr(0, time.indexOf('.')));
                    var hour = parseInt(time.substr(time.indexOf('.')+1, time.indexOf(':')));
                    var h = day*24+hour;
                    time = (h < 10 ? '0' : '') + h + time.substr(time.indexOf(':'));
                }
                $rootScope.reportDuration = time;
                $rootScope.$apply();
            });
        });
    }
    
    $scope.openFromCalendar = function() {
        if(!$("#calendarFromDate").datepicker("widget").is(":visible")){
            $("#calendarFromDate").datepicker( "show" );
        }
        else {
            $("#calendarFromDate").datepicker( "hide" );
        }
    }
    
    $scope.openToCalendar = function() {
        if(!$("#calendarToDate").datepicker("widget").is(":visible")){
            $("#calendarToDate").datepicker( "show" );
        }
        else {
            $("#calendarToDate").datepicker( "hide" );
        }
    }
    
}]);