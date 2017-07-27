angular.module('TimeEntryService', []).service('TimeEntry', function() {
   
    this.GetTodayTimeEntries = function(id) {
        var date = new Date();
        var dateStr = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (date.getDate() < 10 ? '0' : '') + date.getDate() + 'T000000';
        return $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetByUser/'+id+'/'+dateStr
        });
    }
    
    this.GetTimeEntriesByDate = function(id, date) {
        return $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetByUser/'+id+'/'+date
        });
    }
    
    this.GetDuration = function(id, from, to) {
        return $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetDuration/' + currentUser.Id + '/'+from+'/'+to
        });
    }
    
    this.PostTimeEntry = function(timeEntry){
        return $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry',
            method: 'post',
            data: timeEntry
        });
    }
    
});
