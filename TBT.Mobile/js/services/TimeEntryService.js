angular.module('TimeEntryService', []).service('TimeEntry', function() {
   
    this.GetTodayTimeEntries = function(id) {
        var date = new Date();
        var dateStr = '' + date.getFullYear() + ((date.getMonth()+1) < 10 ? '0' : '') + (date.getMonth()+1) + (date.getDate() < 10 ? '0' : '') + date.getDate() + 'T000000';
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/GetByUser/'+id+'/'+dateStr
        });
    }
    
    this.GetTimeEntriesByDate = function(id, date) {
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/GetByUser/'+id+'/'+date
        });
    }
    
    this.GetDuration = function(id, from, to) {
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/GetDuration/' + currentUser.Id + '/'+from+'/'+to
        });
    }
    
    this.GetById = function(id){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/' + id,
            async: false
        });
    }
    
    this.GetByUser = function(id, dateFrom, dateTo){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/GetByUser/' + id + '/' + dateFrom + '/' + dateTo
        });
    }
   
    this.ServerDuration = function(timeEntry){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/ServerDuration',
            method: 'put',
            data: timeEntry,
            async: false
        });
    }    
   
    this.ClientDuration = function(timeEntry){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/ClientDuration',
            method: 'put',
            data: timeEntry,
            async: false
        });
    }    
    
    this.PostTimeEntry = function(timeEntry){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry',
            method: 'post',
            data: timeEntry
        });
    }
        
    this.RemoveTimeEntry = function(id){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/Remove/'+id
        });
    }
    
    this.Start = function(id){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/Start/'+id
        });
    }
    
    this.Stop = function(id){
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/TimeEntry/Stop/'+id
        });
    }
    
});
