angular.module('UserService', []).service('User', function() {
    
    this.GetUserByEmail = function(email) {
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/User?email=' + email
        });
    }
    
    this.PutUser = function(user){
        var currentTimeZone = -(new Date().getTimezoneOffset())/60;
        if(currentTimeZone < 0) user.CurrentTimeZone = '-' + (currentTimeZone > -10 ? '0' : '') + Math.abs(currentTimeZone)  + ':00:00';
        else user.CurrentTimeZone = (currentTimeZone < 10 ? '0' : '') + currentTimeZone  + ':00:00';
        return $.ajax({
             url: 'http://192.168.0.42/tbt/api/User',
             method: 'put',
             data: user
        });
    }
    
});
