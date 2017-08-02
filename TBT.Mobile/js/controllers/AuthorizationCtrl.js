
tbtApp.controller("AuthorizationCtrl", [ 'Main', 'User', 'TimeEntry', '$scope', '$rootScope', function(Main, User, TimeEntry, $scope, $rootScope) {
    
     //temporary for authorization
     $scope.username = "";
     $scope.password = "";
     $scope.rememberMe = true;
     $scope.selectedProjectValue = '--Select project--';
     $scope.selectedActivityValue = '&nbsp;';
     SelectedDay = new Date();
     init();
    
     function init(){
         //window.location.href = '#calendar-page';
         //window.localStorage.clear();
         
         currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
         currentToken = JSON.parse(window.localStorage.getItem("currentToken"));
         RememberMe = JSON.parse(window.localStorage.getItem("RememberMe"));
         Password = window.localStorage.getItem("Password");
         
         if(!!RememberMe){
             Main.GetToken(currentUser.Username, Password).done(function (token) {
                Main.InitInterceptor();
                currentToken = token;
                window.localStorage.setItem("currentToken", JSON.stringify(currentToken));
                
                User.GetUserByEmail(currentUser.Username).done(function (user) {
                    User.PutUser(user).done(function (updatedUser) {
                        currentUser = updatedUser;
                        $rootScope.user = currentUser;
                        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        
                        TimeEntry.GetTodayTimeEntries(currentUser.Id).done(function (res) {
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
                            logIn = true;                 
                            startTimer();
                            window.location.href = '#calendar-page';
                        });
                    });    
                });
             });
         }
     }
     
     $scope.authorization = function(){
        Main.GetToken($scope.username, $scope.password).done(function (token) {
            try{
            Main.InitInterceptor();
            currentToken = token;
            window.localStorage.setItem("currentToken", JSON.stringify(currentToken));
            Password = $scope.password;
            window.localStorage.setItem("Password", Password);
        
            User.GetUserByEmail($scope.username).done(function (user) {
                if(user !== null){ 
                    User.PutUser(user).done(function (updatedUser) {
                        currentUser = updatedUser;
                        $rootScope.user = currentUser;
                        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        RememberMe = $scope.rememberMe;
                        window.localStorage.setItem("RememberMe", RememberMe);
                
                        TimeEntry.GetTodayTimeEntries(currentUser.Id).done(function (res) {
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
                            logIn = true;
                            startTimer();
                            window.location.href = '#calendar-page';
                        });
                    });
                }
                else {
                    alert('Fail authorization!');
                }
            });}
            catch(ex){
                alert(ex.message);
            }
        });
    }
 }]);