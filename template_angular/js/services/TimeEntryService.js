angular.module('TimeEntryService', []).service('TimeEntry', function() {
   
    this.GetAllTimeEntries = function(id) {
        var date = new Date();
        var dateStr = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (date.getDate() < 10 ? '0' : '') + date.getDate() + 'T000000';
        return $.ajax({
            url: 'http://localhost/tbt/api/TimeEntry/GetByUser/'+id+'/'+dateStr
        });
    }
    
});
