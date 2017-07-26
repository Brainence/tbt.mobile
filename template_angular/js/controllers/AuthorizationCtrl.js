tbtApp = angular.module("tbtApp", ['MainService', 'UserService', 'ResetTicketService', 'TimeEntryService']);

tbtApp.controller("AuthorizationCtrl", [ 'Main', 'User', 'ResetTicket', 'TimeEntry', '$scope', '$rootScope', function(Main, User, ResetTicket, TimeEntry, $scope, $rootScope) {
    
     //temporary for authorization
     $scope.username = "vmalanii@brainence.com";
     $scope.password = "brainence!";
     $scope.rememberMe = true;
     SelectedDay = new Date();
     
     function init(){
         //window.localStorage.clear();
         currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
         currentToken = JSON.parse(window.localStorage.getItem("currentToken"));
         RememberMe = window.localStorage.getItem("RememberMe");
         
         if(!!RememberMe){
             $scope.user = currentUser;
             Main.GetToken($scope.username, $scope.password).done(function (token) {
                Main.InitInterceptor();
                currentToken = token;
                window.localStorage.setItem("currentToken", JSON.stringify(currentToken));
                
                User.GetUserByEmail(currentUser.Username).done(function (user) {
                    User.PutUser(user).done(function (updatedUser) {
                        currentUser = updatedUser;
                        $rootScope.user = currentUser;
                        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        
                        
                        TimeEntry.GetAllTimeEntries(currentUser.Id).done(function (res) {
                            $rootScope.timeEntries = res;
                            $rootScope.$apply();
                            window.location.href = '#calendar-page';
                        });
                    });    
                });
             });
         }
     }
     
     init();
     
     $scope.authorization = function(){
        Main.GetToken($scope.username, $scope.password).done(function (token) {
            Main.InitInterceptor();
            currentToken = token;
            window.localStorage.setItem("currentToken", JSON.stringify(currentToken));
        
            User.GetUserByEmail($scope.username).done(function (user) {
                if(user !== null){ 
                    User.PutUser(user).done(function (updatedUser) {
                        currentUser = updatedUser;
                        $rootScope.user = currentUser;
                        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    
                        ResetTicket.CreateResetTicket(currentUser.Id).done(function (result) {
                            if(result === true){
                                RememberMe = $scope.rememberMe;
                                window.localStorage.setItem("RememberMe", $scope.rememberMe);
                        
                                TimeEntry.GetAllTimeEntries(currentUser.Id).done(function (res) {
                                    $rootScope.timeEntries = res;
                                    $rootScope.$apply();
                                    window.location.href = '#calendar-page';
                                });
                            }
                            else {
                                alert('Fail authorization!');
                            }
                        }); 
                    });
                }
                else {
                    alert('Fail authorization!');
                }
            });
        });
    }
 }]);