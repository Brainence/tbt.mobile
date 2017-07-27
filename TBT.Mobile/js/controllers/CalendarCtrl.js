$('.timeEntry-item').swipeleft(function(){
    $(this).css('margin-left', -100);
});   
$('.timeEntry-item').swiperight(function(){
    $(this).css('margin-left', 0);
});   


    
 function startTimer(){
     $('.timeEntry-duration').each(function( index ) {
         var data = $(this).text();
         var h = parseInt(data.substr(0, data.indexOf(":")));
         var m = parseInt(data.substr(data.indexOf(":")+1, data.lastIndexOf(":")));
         var s = parseInt(data.substr(data.lastIndexOf(":")+1));
         s++;
         if(s==60) { s = 0; m++; }
         if(m==60) { m = 0; h++; }
         $(this).text((h > 9 ? h : "0" + h) + ":" + (m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s));
     });
     setTimeout(startTimer, 1000);
 }


tbtApp.controller("CalendarCtrl", [ 'Main', 'User', 'ResetTicket', 'TimeEntry', '$scope', '$rootScope', '$timeout', function(Main, User, ResetTicket, TimeEntry, $scope, $rootScope, $timeout) {
    
    var IsCalendarOpened = false;
    $("#calendarDate").datepicker({
        onSelect: function(date){
            SelectedDay.setMonth(parseInt(date.substr(0, date.indexOf("/")))-1);
            SelectedDay.setDate(parseInt(date.substr(date.indexOf("/")+1, date.lastIndexOf("/"))));
            SelectedDay.setFullYear(parseInt(date.substr(date.lastIndexOf("/")+1)));
            
            var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
            TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
                $rootScope.timeEntries = res;
                $rootScope.$apply();
            });
            
            $scope.calendar = [{numb: SelectedDay.getDate(), month: SelectedDay.getMonth(), year:SelectedDay.getFullYear(), dayOfWeek: SelectedDay.getDay()}];
            $scope.calendar.unshift(prevCalendarDate($scope.calendar[0]));
            $scope.calendar.push(nextCalendarDate($scope.calendar[$scope.calendar.length-1]));
            $scope.$apply();
            $('.calendar-item').removeClass('calendar-item-active');
            $('.calendar-item').each(function(index){
                if(index=='1') $(this).addClass('calendar-item-active');
            });
        }
    });
    
    function init(){
        var date = new Date();
        //$scope.currentDate = {numb: date.getDate(), month: date.getMonth(), year:date.getFullYear(), dayOfWeek: date.getDay()};
        $scope.calendar = [{numb: date.getDate(), month: date.getMonth(), year:date.getFullYear(), dayOfWeek: date.getDay()}];
        $scope.calendar.unshift(prevCalendarDate($scope.calendar[0]));
        $scope.calendar.push(nextCalendarDate($scope.calendar[$scope.calendar.length-1]));
        $timeout(function(){
            $('.calendar-item').each(function(index){
                if(index==1) $(this).addClass('calendar-item-active');
            });
        }, 100);
    }
    
    function prevCalendarDate(date){
        var prevDate = Object.assign({}, date);
        prevDate.numb--;
        if(prevDate.numb==0) {
            prevDate.numb = new Date(prevDate.year, prevDate.month, 0).getDate();
            prevDate.month--;
        }
        if(prevDate.month == -1) {
            prevDate.month = 11;
            prevDate.year--;
        }
        prevDate.dayOfWeek--;
        if(prevDate.dayOfWeek == -1)
            prevDate.dayOfWeek = 6;
        return prevDate;
    }
    
    function nextCalendarDate(date){
        var nextDate = Object.assign({}, date);
        nextDate.numb++;
        var lastDateofMonth = new Date(nextDate.year, nextDate.month+1, 0).getDate();
        if(nextDate.numb==lastDateofMonth+1) {
            nextDate.numb = 1;
            nextDate.month++;
        }
        if(nextDate.month == 12) {
            nextDate.month = 0;
            nextDate.year++;
        }
        nextDate.dayOfWeek++;
        if(nextDate.dayOfWeek == 7)
            nextDate.dayOfWeek = 0;
        return nextDate;
    }
    
    init();

    $scope.selectDay = function(i) {        
        SelectedDay.setDate($scope.calendar[i].numb);
        SelectedDay.setMonth($scope.calendar[i].month);
        SelectedDay.setFullYear($scope.calendar[i].year);
        
        var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
        TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
            $rootScope.timeEntries = res;
            $rootScope.$apply();
        });
        
        $('.calendar-item').removeClass('calendar-item-active');
        $('.calendar-item').each(function(index){
            if(index==i) $(this).addClass('calendar-item-active');
        });
    }
    
    
    $scope.openCalendar = function() {
        $("#calendarDate").datepicker('show');
    }
    
    $scope.selectProject = function(){
        $scope.selectedProject = $scope.user.Projects[$("#listProjects").prop("selectedIndex")];
        //$('#listTasks-button>span').html('&nbsp;');
    }

    $scope.addTimeEntry = function(){
        if($scope.commentValue != 'undefined' && String($scope.commentValue).length >= 2048){
            alert('Comment length cannot be greater then 2048.');
            return;
        }
        var duration;
        var timeLimit;
        var time = String($scope.timeValue);
        var notToday = SelectedDay != 'undefined' && SelectedDay.getDay() != new Date().getDay() && SelectedDay.getMonth() != new Date().getMonth() && SelectedDay.getFullYear() != new Date().getFullYear();

        if (time == 'undefined' || time == '') {
            if (notToday) {
                alert("You have to input the time.");
                return;
            }
            else duration = "00:00:00";
        }
        else if(String(parseInt(time)) == time) {
            var h = parseInt(time);
            if (h == 'undefined' || h < 0 || h >=24) {
                alert("Incorrect time input format.");
                return;
            }
            duration = "" + (h < 10 ? '0' : '') + h + ":00:00";
        }
        else if (time.includes(":")) {
            var hour = time.substr(0, time.indexOf(":"));
            var min = time.substr(time.indexOf(":") + 1);

            var h = parseInt(hour);
            var m = parseInt(min);

            if (h == 'undefined' || m == 'undefined' || h < 0 || h >=24 || m < 0 || m > 59) {
                alert("Incorrect time input format.");
                return;
            }

            duration = "" + (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + ":00";
        }
        else {
            alert("Incorrect time input format.");
            return;
        }

        if (currentUser.TimeLimit != 'undefined' && (GetWorkedHoursForMonth() + duration.substr(0, duration.indexOf(":"))) < currentUser.TimeLimit) {
            alert("You have reached your monthly "+currentUser.TimeLimit+"-hour limit.");
            return;
        }

        var date = new Date();
        var timeEntry = {
            User: { Id: currentUser.Id },
            Activity: { Id: $scope.selectedProject.Activities[$('#listTasks').prop('selectedIndex')].Id },
            Date: SelectedDay != 'undefined' && SelectedDay.getDay() != date.getDay() ? SelectedDay.toISOString() : date.toISOString(),
            Comment: String($scope.commentValue),
            IsActive: 'true',
            Duration: duration,
            TimeLimit: timeLimit
        };

        TimeEntry.PostTimeEntry(timeEntry).done(function (updatedTimeEntry) {
            timeEntry = updatedTimeEntry;
            
            var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
            TimeEntry.GetTimeEntriesByDate(currentUser.Id, dateStr).done(function (res) {
                $rootScope.timeEntries = res;
                $rootScope.$apply();
            });
        });

        $scope.timeValue = '';
        $scope.commentValue = '';
    }
    
    
    function GetWorkedHoursForMonth() {
        var date = new Date();
        var dateLast = new Date(date.getFullYear(), date.getMonth(), 0);
        var dateNext = new Date(date.getFullYear(), date.getMonth()+1, 0);
        var dateFrom = '' + date.getFullYear() + (date.getMonth() < 10 ? '0' : '') + date.getMonth() + (dateLast.getDate() < 10 ? '0' : '') + dateLast.getDate() + 'T000000'; 
        var dateTo = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (dateNext.getDate() < 10 ? '0' : '') + dateNext.getDate() + 'T000000';         
        TimeEntry.GetDuration(currentUser.Id, dateFrom, dateTo).done(function (result) {
            var hours = result.substr(0,result.indexOf(":"));
            if(hours.includes(".")) {
                var day = parseInt(hours.substr(0, hours.indexOf(".")));
                var hour = parseInt(hours.substr(hours.indexOf(".") + 1));
                return day*24 + hour;
            }
            else return parseInt(hours);
        });   
    }
    
} ]);