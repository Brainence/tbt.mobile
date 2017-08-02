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
            url: 'http://194.44.161.226:753/tbt/token',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: 'grant_type=password&UserName='+encodeURIComponent(email)+'&Password='+encodeURIComponent(password)
        });
    }
});


//192.168.0.42
//194.44.161.226:753