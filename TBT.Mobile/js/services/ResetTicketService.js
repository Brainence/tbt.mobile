angular.module('ResetTicketService', []).service('ResetTicket', function() {
    
    this.CreateResetTicket = function(id) {
        return $.ajax({
            url: 'http://localhost/tbt/api/ResetTicket/CreateResetTicket/' + id
        });
    }
    
});
