angular.module('ResetTicketService', []).service('ResetTicket', function() {
    
    this.CreateResetTicket = function(id) {
        return $.ajax({
            url: 'http://192.168.0.42/tbt/api/ResetTicket/CreateResetTicket/' + id
        });
    }
    
});
