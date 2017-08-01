
tbtApp.controller("CalendarCtrl", [ 'Main', 'User', 'ResetTicket', 'TimeEntry', '$scope', '$rootScope', '$timeout', function(Main, User, ResetTicket, TimeEntry, $scope, $rootScope, $timeout) {
    
    var editedTime;
    var editedTimeEntry;
    $scope.editMode = false;
    $("#calendarDate").datepicker({
        onSelect: function(date){
            SelectedDay.setMonth(parseInt(date.substr(0, date.indexOf("/")))-1);
            SelectedDay.setDate(parseInt(date.substr(date.indexOf("/")+1, date.lastIndexOf("/"))));
            SelectedDay.setFullYear(parseInt(date.substr(date.lastIndexOf("/")+1)));
            
            var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
            TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
                $rootScope.timeEntries = res;
                for(var i =0; i<$rootScope.timeEntries.length; i++)
                    $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
                $rootScope.$apply();
                
                var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
                if (!notToday)
                {
                    for(var i =0; i<$rootScope.timeEntries.length; i++){
                        if($rootScope.timeEntries[i].IsRunning){
                            $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                            $('.timeEntry-duration').each(function( index ) {
                                if(i == index)
                                    $(this).addClass('timeEntry-duration-active');
                            });
                        }
                    }
                } 
            });
            
            $scope.calendar = [{numb: SelectedDay.getDate(), month: SelectedDay.getMonth(), year:SelectedDay.getFullYear(), dayOfWeek: SelectedDay.getDay()}];
            $scope.calendar.unshift(prevCalendarDate($scope.calendar[0]));
            $scope.calendar.push(nextCalendarDate($scope.calendar[$scope.calendar.length-1]));
            $scope.$apply();
            $('.calendar-item').removeClass('calendar-item-active');
            $('.calendar-item').each(function(index){
                if(index=='1') $(this).addClass('calendar-item-active');
            });
        },
        onClose: function(input, inst) {
            if($("#calendarDate").datepicker("widget").is(":visible")){
                $("#calendarDate").datepicker( "hide" );
            }
        }
    });
    init();
    
    function init(){
        var date = new Date();
        $scope.calendar = [{numb: date.getDate(), month: date.getMonth(), year:date.getFullYear(), dayOfWeek: date.getDay()}];
        $scope.calendar.unshift(prevCalendarDate($scope.calendar[0]));
        $scope.calendar.push(nextCalendarDate($scope.calendar[$scope.calendar.length-1]));
        $timeout(function(){
            $('.calendar-item').each(function(index){
                if(index==1) $(this).addClass('calendar-item-active');
            });
        }, 100);
    }
    
    $scope.swipeCalendarLeft = function(){
        console.log($scope.calendar);
        for(var i = 0; i<3; i++) {
            $scope.calendar.push(nextCalendarDate($scope.calendar[$scope.calendar.length-1]));
            $scope.calendar.shift(); 
        }
        console.log($scope.calendar);
        
        SelectedDay.setMonth($scope.calendar[1].month);
        SelectedDay.setDate($scope.calendar[1].numb);
        SelectedDay.setFullYear($scope.calendar[1].year);
        
        var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
        TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
            $rootScope.timeEntries = res;
            for(var i =0; i<$rootScope.timeEntries.length; i++)
                $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
            $rootScope.$apply();
            
            var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
            if (!notToday)
            {
                for(var i =0; i<$rootScope.timeEntries.length; i++){
                    if($rootScope.timeEntries[i].IsRunning){
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( index ) {
                            if(i == index)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    }
                }
            } 
        });
        
        $timeout(function(){
            $('.calendar-item').removeClass('calendar-item-active');
            $('.calendar-item').each(function(index){
                if(index==1) $(this).addClass('calendar-item-active');
            });
        }, 1);
    }
    
    $scope.swipeCalendarRight = function(){
        for(var i = 0; i<3; i++) $scope.calendar.unshift(prevCalendarDate($scope.calendar[0]));
        for(var i = 0; i<3; i++) $scope.calendar.pop();        
        
        SelectedDay.setMonth($scope.calendar[1].month);
        SelectedDay.setDate($scope.calendar[1].numb);
        SelectedDay.setFullYear($scope.calendar[1].year);
        
        var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
        TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
            $rootScope.timeEntries = res;
            for(var i =0; i<$rootScope.timeEntries.length; i++)
                $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
            $rootScope.$apply();
            
            var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
            if (!notToday)
            {
                for(var i =0; i<$rootScope.timeEntries.length; i++){
                    if($rootScope.timeEntries[i].IsRunning){
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( index ) {
                            if(i == index)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    }
                }
            } 
        });
        
        $timeout(function(){
            $('.calendar-item').removeClass('calendar-item-active');
            $('.calendar-item').each(function(index){
                if(index==1) $(this).addClass('calendar-item-active');
            });
        }, 1);
    }
    
    
    $scope.swipeLeft = function(i){
        $('.timeEntry-item').each(function( index ) {
            if(i == index) $(this).animate({marginLeft: '-145px'}); 
        });
    }
    
    $scope.swipeRight = function(i){
         $('.timeEntry-item').each(function( index ) {
            if(i == index) $(this).animate({marginLeft: '0px'}); 
        });
    }

    $scope.selectDay = function(i) {
        SelectedDay.setDate($scope.calendar[i].numb);
        SelectedDay.setMonth($scope.calendar[i].month);
        SelectedDay.setFullYear($scope.calendar[i].year);
        
        var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
        TimeEntry.GetTimeEntriesByDate(currentUser.Id,dateStr).done(function (res) {
            $rootScope.timeEntries = res;
            for(var i =0; i<$rootScope.timeEntries.length; i++)
                $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
            $rootScope.$apply();
            
            var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
            if (!notToday)
            {
                for(var i =0; i<$rootScope.timeEntries.length; i++){
                    if($rootScope.timeEntries[i].IsRunning){
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( index ) {
                            if(i == index)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    }
                }
            } 
        });
        
        $('.calendar-item').removeClass('calendar-item-active');
        $('.calendar-item').each(function(index){
            if(index==i) $(this).addClass('calendar-item-active');
        });
    }
    
    
    $scope.openCalendar = function() {
        if(!$("#calendarDate").datepicker("widget").is(":visible")){
            $("#calendarDate").datepicker( "show" );
        }
        else {
            $("#calendarDate").datepicker( "hide" );
        }
    }
    
    $scope.selectProject = function(){
        $scope.selectedProject = $scope.user.Projects[$("#listProjects").prop("selectedIndex")];
        //$('#listTasks-button>span').html('&nbsp;');
    }

    $scope.addTimeEntry = function(){
        if($scope.selectedProjectValue == undefined || $scope.selectedActivityValue == undefined){
            alert('Not selected project or task!');
            return;
        }
        
        if($scope.commentValue != 'undefined' && String($scope.commentValue).length >= 2048){
            alert('Comment length cannot be greater then 2048.');
            return;
        }
        var duration;
        var timeLimit;
        var time = String($scope.timeValue);
        var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();

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
                for(var i =0; i<$rootScope.timeEntries.length; i++)
                    $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
                $rootScope.$apply();
                if (!notToday)
                {
                    for(var i =0; i<$rootScope.timeEntries.length; i++){
                        if(i==$rootScope.timeEntries.length-1) $rootScope.timeEntries[i].IsRunning = true;
                        else $rootScope.timeEntries[i].IsRunning = false;
                    }
                    TimeEntry.Start($rootScope.timeEntries[$rootScope.timeEntries.length-1].Id).done(function(){
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( i ) {
                            if(i == $rootScope.timeEntries.length-1)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    });
                } 
            });
        });

        $scope.timeValue = '';
        $scope.commentValue = '';
    }
    
    $scope.editTimeEntry = function(index){
        editedTimeEntry = index;
        window.scrollTo(0, 0);
        $scope.editMode = true;
        $('#listProjects').prop('selectedIndex', index);
        $scope.selectProject();
        $('#listTasks').prop('selectedIndex', index);
        $scope.selectedProjectValue = $rootScope.timeEntries[index].Activity.Project.Name;
        $('#listProjects-button>span').text($rootScope.timeEntries[index].Activity.Project.Name);
        $scope.selectedActivityValue = $rootScope.timeEntries[index].Activity.Name;
        $('#listTasks-button>span').text($rootScope.timeEntries[index].Activity.Name);
        $scope.timeValue = $rootScope.timeEntries[index].Duration;
        $scope.commentValue = $rootScope.timeEntries[index].Comment;
        editedTime = $rootScope.timeEntries[index].Duration;
        $("#listProjects").prop("disabled", true);
        $("#listTasks").prop("disabled", true);
    }
    
    $scope.saveTimeEntry = function(){        
        if($scope.commentValue != 'undefined' && String($scope.commentValue).length >= 2048){
            alert('Comment length cannot be greater then 2048.');
            endEdit();
            return;
        }
        
        var duration;
        var timeLimit;
        var time = String($scope.timeValue);
        var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
        var clientDuration = true;
        
        if (time == 'undefined' || time == '') {
            duration = "00:00:00";
        }
        else if(editedTime == time){
            TimeEntry.GetById($rootScope.timeEntries[editedTimeEntry].Id).done(function(tEntry){
                duration = tEntry.Duration;
                clientDuration = false;
            });            
        }
        else if(String(parseInt(time)) == time) {
            var h = parseInt(time);
            if (h == 'undefined' || h < 0 || h >=24) {
                alert("Incorrect time input format.");
                endEdit();
                return;
            }            
            duration = "" + (h < 10 ? '0' : '') + h + ":00:00";
        }
        else if (time.includes(":")) {
            var hour = time.substr(0, time.indexOf(":"));
            var min = time.substr(time.indexOf(":") + 1, time.lastIndexOf(":"));
            var sec = time.substr(time.lastIndexOf(":") + 1);

            var h = parseInt(hour);
            var m = parseInt(min);
            var s = parseInt(sec);

            if (h == 'undefined' || m == 'undefined' || s == 'undefined' || h < 0 || h >=24 || m < 0 || m > 59 || s < 0 || s > 59) {
                alert("Incorrect time input format.");
                endEdit();
                return;
            }

            duration = "" + (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + ":" + (s < 10 ? '0' : '') + s;
        }
        else {
            alert("Incorrect time input format.");
            endEdit();
            return;
        }    
        $rootScope.timeEntries[editedTimeEntry].Duration = duration;
        
        if(String($scope.commentValue) != $rootScope.timeEntries[editedTimeEntry].Comment)
            $rootScope.timeEntries[editedTimeEntry].Comment = String($scope.commentValue);
        
        /*if($rootScope.timeEntries[editedTimeEntry].Activity.Id != $scope.selectedProject.Activities[$('#listTasks').prop('selectedIndex')].Id)
            $rootScope.timeEntries[editedTimeEntry].Activity.Id = $scope.selectedProject.Activities[$('#listTasks').prop('selectedIndex')].Id;*/
        
        if(clientDuration) TimeEntry.ClientDuration($rootScope.timeEntries[editedTimeEntry]);
        else TimeEntry.ServerDuration($rootScope.timeEntries[editedTimeEntry]);
        
        var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
        TimeEntry.GetTimeEntriesByDate(currentUser.Id, dateStr).done(function (res) {
            $rootScope.timeEntries = res;
            for(var i =0; i<$rootScope.timeEntries.length; i++)
                $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
            $rootScope.$apply();     
            
            var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
            if (!notToday)
            {
                for(var i =0; i<$rootScope.timeEntries.length; i++){
                    if($rootScope.timeEntries[i].IsRunning){
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( index ) {
                            if(i == index)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    }
                }
            } 
        });
        
        endEdit();
    }
    
    $scope.cancelTimeEntry = function(){
        endEdit();
    }
    
    function endEdit(){
        $scope.editMode = false;
        $('.timeEntry-item').each(function( index ) {
            if(editedTimeEntry == index) $(this).animate({marginLeft: '0px'}); 
        });
        $("#listProjects").prop("disabled", false);
        $("#listTasks").prop("disabled", false);
        $scope.timeValue = '';
        $scope.commentValue = '';
    }
    
    $scope.removeTimeEntry = function(index){
        TimeEntry.RemoveTimeEntry($rootScope.timeEntries[index].Id).done(function () {
            var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
            TimeEntry.GetTimeEntriesByDate(currentUser.Id, dateStr).done(function (res) {
                $rootScope.timeEntries = res;
                for(var i =0; i<$rootScope.timeEntries.length; i++)
                    $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
                $rootScope.$apply();   
            });
        });
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
    
    $scope.TickTime = function(index) {
        var notToday = SelectedDay.getDay() != new Date().getDay() || SelectedDay.getMonth() != new Date().getMonth() || SelectedDay.getFullYear() != new Date().getFullYear();
        if (!notToday)
        {
            $rootScope.timeEntries[index].IsRunning = !$rootScope.timeEntries[index].IsRunning;
            if($rootScope.timeEntries[index].IsRunning){
                TimeEntry.Start($rootScope.timeEntries[index].Id).done(function(){
                    var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
                    TimeEntry.GetTimeEntriesByDate(currentUser.Id, dateStr).done(function (res) {
                        $rootScope.timeEntries = res;
                        for(var i =0; i<$rootScope.timeEntries.length; i++)
                            $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
                        $rootScope.$apply();    
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                        $('.timeEntry-duration').each(function( i ) {
                            if(i == index)
                                $(this).addClass('timeEntry-duration-active');
                        });
                    });
                });
            }
            else {
                TimeEntry.Stop($rootScope.timeEntries[index].Id).done(function(){
                    var dateStr = '' + SelectedDay.getFullYear() + ((SelectedDay.getMonth()+1) < 10 ? '0' : '') + (SelectedDay.getMonth()+1) + (SelectedDay.getDate() < 10 ? '0' : '') + SelectedDay.getDate() + 'T000000';
                    TimeEntry.GetTimeEntriesByDate(currentUser.Id, dateStr).done(function (res) {
                        $rootScope.timeEntries = res;
                        for(var i =0; i<$rootScope.timeEntries.length; i++)
                            $rootScope.timeEntries[i].Duration = $rootScope.timeEntries[i].Duration.substr(0,8);
                        $rootScope.$apply();
                        $('.timeEntry-duration').removeClass('timeEntry-duration-active');
                    });
                });                
            }
        } 
    }
    
} ]);

 function startTimer(){
     $('.timeEntry-duration-active').each(function( index ) {
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
    prevDate.$$hashKey++;
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
    nextDate.$$hashKey++;
    return nextDate;
}
    