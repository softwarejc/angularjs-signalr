(function () {
    'use strict';

    angular
        .module('notesModule')
        .controller('notesController', ['notesService', '$cookies', '$scope', notesController]);

    notesController.$inject = ['notesService'];
    notesController.$inject = ['$cookies'];
    notesController.$inject = ['$scope'];

    function notesController(notesService, $cookies, $scope) {
        var self = this;

        //// ---------------- PUBLIC ----------------
        //// PUBLIC fields
        // true after connected to signalR
        self.connected = false;
        self.connectionId = "not connected";

        //// PUBLIC Methods
        self.activate = _activate;

        //// ---------------- CODE TO RUN -----------
        self.activate();

        //// ---------------- PRIVATE ---------------
        //// PRIVATE fields

        //// PRIVATE Functions - Public Methods Implementation	
        function _activate() {
            notesService.initialize();

            $scope.$on(signalR.onConnected, function (event, args) {
                connectedToSignalR(args.connectionId);
            });


        }

        //// PRIVATE Functions
        function connectedToSignalR(connectionId) {
            // this needs to be executed within the apply, otherwise angular cannot update bindings
            $scope.$apply(function () {
                self.connected = true;

                self.connectionId = connectionId;
            });

        }
    }
})();
