
tbtApp.controller("MenuCtrl", [ 'TimeEntry', '$scope', '$rootScope', function(TimeEntry, $scope, $rootScope) {
    
    $scope.InitReportingPage = function(){
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
        var dateFrom = '' + from.year + ((from.month+1) < 10 ? '0' : '') + (from.month+1) + (from.numb < 10 ? '0' : '') + from.numb + 'T000000';
        var dateTo = '' + to.year + ((to.month+1) < 10 ? '0' : '') + (to.month+1) + (to.numb < 10 ? '0' : '') + to.numb + 'T000000';
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
}]);