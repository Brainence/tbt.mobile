angular.module('MainService', []).service('Main', function() {
    
    this.InitInterceptor = function() {
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', currentToken.token_type + ' ' + currentToken.access_token);       
            }
        });
    }
    
    this.GetToken = function(email, password){
        return $.ajax({
            url: 'http://localhost/tbt/token',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: 'grant_type=password&UserName='+email+'&Password='+password
        });
    }
});
