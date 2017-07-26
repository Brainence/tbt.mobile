tbtApp.controller("CalendarCtrl", [ '$scope', '$rootScope', function($scope, $rootScope) {
       
         $scope.selectProject = function(){
             $scope.selectedProject = $scope.user.Projects[$("#listProjects").prop("selectedIndex")];
         }
         this.GetWorkedHoursForMonth = function() {
        var date = new Date();
        var dateLast = new Date(date.getFullYear(), date.getMonth(), 0);
        var dateNext = new Date(date.getFullYear(), date.getMonth()+1, 0);
        var dateFrom = '' + date.getFullYear() + (date.getMonth() < 10 ? '0' : '') + date.getMonth() + (dateLast.getDate() < 10 ? '0' : '') + dateLast.getDate() + 'T000000'; 
        var dateTo = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (dateNext.getDate() < 10 ? '0' : '') + dateNext.getDate() + 'T000000';         
        $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetDuration/' + currentUser.Id + '/'+dateFrom+'/'+dateTo
        }).done(function (result) {
            var hours = result.substr(0,result.indexOf(":"));
            if(hours.includes(".")) {
                var day = parseInt(hours.substr(0, hours.indexOf(".")));
                var hour = parseInt(hours.substr(hours.indexOf(".") + 1));
                return day*24 + hour;
            }
            else return parseInt(hours);
        });   
    }
    
    this.GetAllTimeEntries = function() {
        var date = new Date();
        var dateStr = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (date.getDate() < 10 ? '0' : '') + date.getDate() + 'T000000';
        $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetByUser/'+currentUser.Id+'/'+dateStr
        }).done(function (res) {
            return res;
        });    
    }
    
         $scope.addTimeEntry = function(){
             if($scope.commentValue != 'undefined' && String($scope.commentValue).length >= 2048){
                 alert('Comment length cannot be greater then 2048.');
                 return;
             }
             var duration;
             var timeLimit;
             var time = String($scope.timeValue);
             var notToday = SelectedDay != 'undefined' && SelectedDay.getDay() != new Date().getDay();
             
            if (time == 'undefined' || time == '')
            {
                if (notToday)
                {
                    alert("You have to input the time.");
                    return;
                }
                else
                {
                    duration = "00:00:00";
                }
            }
            else if(String(parseInt(time)) == time)
             {
                var h = parseInt(time);
                if (h == 'undefined' || h < 0 || h >=24)
                {
                    alert("Incorrect time input format.");
                    return;
                }
                
                duration = "" + (h < 10 ? '0' : '') + h + ":00:00";
             }
            else if (time.includes(":"))
            {
                var hour = time.substr(0, time.indexOf(":"));
                var min = time.substr(time.indexOf(":") + 1);

                var h = parseInt(hour);
                var m = parseInt(min);

                if (h == 'undefined' || m == 'undefined' || h < 0 || h >=24 || m < 0 || m > 59)
                {
                    alert("Incorrect time input format.");
                    return;
                }
                
                duration = "" + (h < 10 ? '0' : '') + h + ":" + (m < 10 ? '0' : '') + m + ":00";
            }
            else
            {
                alert("Incorrect time input format.");
                return;
            }

             if (currentUser.TimeLimit != 'undefined' && (GetWorkedHoursForMonth() + duration.substr(0, duration.indexOf(":"))) < currentUser.TimeLimit)
             {
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
             
             $.ajax({
                 url: 'http://localhost/tbt/api/TimeEntry',
                 method: 'post',
                 data: timeEntry
            }).done(function (updatedTimeEntry) {
                timeEntry = updatedTimeEntry;
            });

             $rootScope.timeEntries = Authorization.GetAllTimeEntries();
             $rootScope.$apply();
             
             $scope.timeValue = '';
             $scope.commentValue = '';
         }
     } 
]);